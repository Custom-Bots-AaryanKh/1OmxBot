const { MessageEmbed, MessageAttachment } = require("discord.js")
const db = require('quick.db')
const log = '791266321576361985' //log-channel

module.exports = (client) => {
    client.on('message', async(message) => {
        if(message.channel.type === 'dm'){
            if(message.author.bot) return
            if(message.content.includes("@everyone") || message.content.includes("@here")){
                const embed = new MessageEmbed()
                .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
                .setDescription(`<:emojino:796264735649300480> You cannot mention everyone in mod-mail!`)
                .setColor('RED')
                .setTimestamp()
                .setFooter(`Hope's Discord Cafe`)
                return message.author.send(embed)
            }

            var table = new db.table('Tickets')
            let active = await table.get(`support.${message.author.id}`)
            let guild = client.guilds.cache.get('790894331514585088') //guild
            let channel
            let category
            let user = await table.get(`isBlocked.${message.author.id}`)

            if(user === true || user === 'true') return message.react('<:emojino:796264735649300480>')
            if(active === null || active === false || active === "false"){

                active = {}
                let modrole = guild.roles.cache.get('790894476632653825') //modrole
                let everyone = guild.roles.everyone.id
                let bot = guild.roles.cache.get('790895754922295318') //botrole
                await table.add('ticket', 1)
                let actualTicket = await table.get('ticket')

                channel = await guild.channels.create(`${message.author.username}-${message.author.discriminator}`, { type: 'text', reason: `Modmail created ticket #${actualTicket}.`})
                category = await guild.channels.create(`modmail-tickets`, { type: 'category', reason: 'Modmail Requirement!'})
                channel.setParent(category.id)
                channel.setTopic(`#${actualTicket} (Open) | .complete to close this ticket! | Modmail for ${message.author.username}`)
                channel.createOverwrite(modrole, {
                    VIEW_CHANNEL: true,
                    SEND_MESSAGES: true,
                    READ_MESSAGE_HISTORY: true
                })
                channel.createOverwrite(everyone, {
                    VIEW_CHANNEL: false,
                })
                channel.createOverwrite(bot, {
                    VIEW_CHANNEL: true,
                    SEND_MESSAGES: true,
                    READ_MESSAGE_HISTORY: true,
                    MANAGE_MESSAGES: true
                })

                let author = message.author
                const newTicket = new MessageEmbed()
                .setColor('GREEN')
                .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
                .setTimestamp()
                .setFooter(`Hope's Discord Cafe`)
                .setTitle('New Ticket Created!')
                .addFields(
                    {
                        name: 'Ticket No.',
                        value: actualTicket,
                        inline: true
                    },
                    {
                        name: 'Channel',
                        value: `<#${channel.id}>`,
                        inline: true
                    }
                )

                client.channels.cache.get(log).send({ embed: newTicket })

                const newChannel = new MessageEmbed()
                .setDescription(`Ticket #${actualTicket} created!\nUser: ${author}\nID: ${author.id}`)
                .setColor('GREEN')
                .setTimestamp()
                .setFooter(`Hope's Discord Cafe`)
                message.author.send()
                await client.channels.cache.get(channel.id).send({ embed: newChannel })

                const authorEmbed = new MessageEmbed()
                .setDescription(`<:emojiyes:796264735833980968> Successfully created ticket as #${actualTicket}!`)
                .setColor('GREEN')
                .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
                .setFooter(`Hope's Discord Cafe`)
                .setTimestamp()
                message.author.send(authorEmbed)

                active.channelID = channel.id
                active.targetID = author.id
            }

            channel = client.channels.cache.get(active.channelID)
            var msg = message.content
            var whatWeWant = msg.replace('@everyone', "[everyone]").replace('@here', "[here]")

            var isBlocked = await table.get(`isBlocked.${message.author.id}`)
            var isPaused = await table.get(`suspended.${message.author.id}`)
            if(isPaused === true){
                const pausedEmbed = new MessageEmbed()
                .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
                .setDescription(`<:emojino:796264735649300480> Sorry, but your ticket is currently paused. We will message you when it is continued/resumed!`)
                .setColor('RED')
                .setTimestamp()
                .setFooter(`Hope's Discord Cafe`)
                return message.author.send(pausedEmbed)
            }
            if(isBlocked === true) return
            message.react('<:emojiyes:796264735833980968>')

            if(message.attachments.size > 0){
                let attachment = new MessageAttachment(message.attachments.first().url)
                channel.send(`${message.author.username} > ${whatWeWant}`, { files: [message.attachments.first().url] })
            } else {
                channel.send(`${message.author.username} > ${whatWeWant}`)
            }
            await table.set(`support.${message.author.id}`, active)
            await table.set(`supportChannel.${channel.id}`, message.author.id)
            return
        }

        if(message.author.bot) return
        var table = new db.table('Tickets')
        var support = await table.get(`supportChannel.${message.channel.id}`)
        if(support){
            var support = await table.get(`support.${support}`)
            let supportUser = message.guild.members.cache.get(support.targetID)
            if(!supportUser) return message.channel.delete()
            
            //replying system
            if(message.content.startsWith('.reply') || message.content.startsWith('.r')){
                var isPause = await table.get(`suspended.${support.targetID}`)
                var isBlock = await table.get(`isBlocked.${support.targetID}`)
                if(isPause === true){
                    const pausedEmbed = new MessageEmbed()
                    .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
                    .setDescription(`<:emojino:796264735649300480> This ticket is currently paused. Unpause it to continue!`)
                    .setColor('RED')
                    .setTimestamp()
                    .setFooter(`Hope's Discord Cafe`)
                    return message.author.send(pausedEmbed)
                }
                if(isBlock === true){
                    const blockedEmbed = new MessageEmbed()
                    .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
                    .setDescription(`<:emojino:796264735649300480> This ticket is currently blocked. Unblock it to continue or close the ticket!`)
                    .setColor('RED')
                    .setTimestamp()
                    .setFooter(`Hope's Discord Cafe`)
                    return message.author.send(blockedEmbed)
                }
                var args = message.content.split(" ").slice(1)
                let msg = args.join(' ')
                message.react('<:emojiyes:796264735833980968>')
                if(message.attachments.size > 0){
                    let attachment = new MessageAttachment(message.attachments.first().url)
                    return supportUser.send(`[${message.member.roles.highest.name}] ${message.author.username} > ${msg}`, { files: [message.attachments.first().url] })
                } else {
                    return supportUser.send(`[${message.member.roles.highest.name}] ${message.author.username} > ${msg}`)
                }
            }

            //anonymous reply
            if(message.content.startsWith('.areply') || message.content.startsWith('.ar')){
                var isPause = await table.get(`suspended.${support.targetID}`)
                var isBlock = await table.get(`isBlocked.${support.targetID}`)
                if(isPause === true){
                    const pausedEmbed = new MessageEmbed()
                    .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
                    .setDescription(`<:emojino:796264735649300480> This ticket is currently paused. Unpause it to continue!`)
                    .setColor('RED')
                    .setTimestamp()
                    .setFooter(`Hope's Discord Cafe`)
                    return message.author.send(pausedEmbed)
                }
                if(isBlock === true){
                    const blockedEmbed = new MessageEmbed()
                    .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
                    .setDescription(`<:emojino:796264735649300480> This ticket is currently blocked. Unblock it to continue or close the ticket!`)
                    .setColor('RED')
                    .setTimestamp()
                    .setFooter(`Hope's Discord Cafe`)
                    return message.author.send(blockedEmbed)
                }
                var args = message.content.split(" ").slice(1)
                let msg = args.join(' ')
                message.react('<:emojiyes:796264735833980968>')
                if(message.attachments.size > 0){
                    let attachment = new MessageAttachment(message.attachments.first().url)
                    return supportUser.send(`Support Team > ${msg}`, { files: [message.attachments.first().url] })
                } else {
                    return supportUser.send(`Support Team > ${msg}`)
                }
            }

            //get id of the user
            if(message.content.startsWith('.id')){
                const idEmbed = new MessageEmbed()
                .setDescription(`<:emojiyes:796264735833980968> **User's ID:** ${support.targetID}`)
                .setColor('GREEN')
                .setFooter(`Hope's Discord Cafe`)
                .setTimestamp()
                return message.channel.send(idEmbed)
            }

            //pause a ticket
            if(message.content.startsWith('.pause')){
                var isPause = await table.get(`suspended.${support.targetID}`)
                if(isPause === true || isPause === 'true'){
                    const pausedEmbed = new MessageEmbed()
                    .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
                    .setDescription(`<:emojino:796264735649300480> This ticket is already paused. Unpause it to continue!`)
                    .setColor('RED')
                    .setTimestamp()
                    .setFooter(`Hope's Discord Cafe`)
                    return message.author.send(pausedEmbed)
                }

                await table.set(`suspended.${support.targetID}`, true)
                const suspend = new MessageEmbed()
                .setDescription(`<:emojiyes:796264735833980968> Successfully **suspended** the tread! Do \`.continue\` to continue the thread!`)
                .setColor('GREEN')
                .setTimestamp()
                .setFooter(`Hope's Discord Cafe`)
                .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
                message.channel.send({ embed: suspend })
                
                const userEmbed = new MessageEmbed()
                .setDescription(`<:emojino:796264735649300480> Your ticket has been **paused**! We will tell you when it will be continued again!`)
                .setColor('RED')
                .setTimestamp()
                .setFooter(`Hope's Discord Cafe`)
                return supportUser.send(userEmbed)
            }

            //continue a ticket
            if(message.content.startsWith('.continue')){
                var isPause = await table.get(`suspended.${support.targetID}`)
                if(isPause === null || isPause === false){
                    const pausedEmbed = new MessageEmbed()
                    .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
                    .setDescription(`<:emojino:796264735649300480> This ticket isn't plaused yet! You can pause it by \`.pause\`!`)
                    .setColor('RED')
                    .setTimestamp()
                    .setFooter(`Hope's Discord Cafe`)
                    return message.author.send(pausedEmbed)
                }
                await table.delete(`suspended.${support.targetID}`)

                const continueEmbed = new MessageEmbed()
                .setDescription(`<:emojiyes:796264735833980968> Successfully **continued** the ticket! You can again pause it by \`.pause\``)
                .setColor('GREEN')
                .setTimestamp()
                .setFooter(`Hope's Discord Cafe`)
                .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
                message.channel.send({ embed: continueEmbed })

                const userEmbed = new MessageEmbed()
                .setDescription(`<:emojiyes:796264735833980968> Your ticket has been **unpaused**! Now you can continue sending messages to the support team!`)
                .setColor('GREEN')
                .setTimestamp()
                .setFooter(`Hope's Discord Cafe`)
                return supportUser.send(userEmbed)
            }
            
            //block a ticket
            if(message.content.startsWith('.block')){
                var isBlock = await table.get(`isBlocked.${support.targetID}`)
                if(isBlock === true || isBlock === 'true'){
                    const blockedEmbed = new MessageEmbed()
                    .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
                    .setDescription(`<:emojino:796264735649300480> This ticket is already blocked. Unblock it to continue!`)
                    .setColor('RED')
                    .setTimestamp()
                    .setFooter(`Hope's Discord Cafe`)
                    return message.author.send(blockedEmbed)
                }

                await table.set(`isBlocked.${support.targetID}`, true)
                const block = new MessageEmbed()
                .setDescription(`<:emojiyes:796264735833980968> Successfully **blocked** the tread! Do \`.unblock\` to continue the thread or \`.complete\` to close it!`)
                .setColor('GREEN')
                .setTimestamp()
                .setFooter(`Hope's Discord Cafe`)
                .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
                message.channel.send({ embed: block })
                
                const userEmbed = new MessageEmbed()
                .setDescription(`<:emojino:796264735649300480> Your ticket has been **blocked**! If its gets continued, we will notify you or your ticket will be closed!`)
                .setColor('RED')
                .setTimestamp()
                .setFooter(`Hope's Discord Cafe`)
                return supportUser.send(userEmbed)
            }

            //unblock a ticket
            if(message.content.startsWith('.unblock')){
                var isBlock = await table.get(`isBlocked.${support.targetID}`)
                if(isBlock === null || isBlock === false){
                    const blockedEmbed = new MessageEmbed()
                    .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
                    .setDescription(`<:emojino:796264735649300480> This ticket isn't plaused yet! You can block it by \`.block\`!`)
                    .setColor('RED')
                    .setTimestamp()
                    .setFooter(`Hope's Discord Cafe`)
                    return message.author.send(blockedEmbed)
                }
                await table.delete(`isBlocked.${support.targetID}`)

                const continueEmbed = new MessageEmbed()
                .setDescription(`<:emojiyes:796264735833980968> Successfully **unblocked** the ticket! You can again block it by \`.block\``)
                .setColor('GREEN')
                .setTimestamp()
                .setFooter(`Hope's Discord Cafe`)
                .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
                message.channel.send({ embed: continueEmbed })

                const userEmbed = new MessageEmbed()
                .setDescription(`<:emojiyes:796264735833980968> Your ticket has been **unblock**! Now you can continue sending messages to the support team!`)
                .setColor('GREEN')
                .setTimestamp()
                .setFooter(`Hope's Discord Cafe`)
                return supportUser.send(userEmbed)
            }

            //complete
            if(message.content.startsWith('.complete')){
                const embed = new MessageEmbed()
                .setDescription('<:emojiyes:796264735833980968> This ticket will be deleted in **10** seconds! This thread is locked and closed!')
                .setColor('GREEN')
                .setTimestamp()
                .setFooter(`Hope's Discord Cafe`)
                message.channel.send(embed)

                var timeout = 10000
                setTimeout(() => { end(support.targetID) }, timeout)
            }

            // async function!
            async function end(userId) {
                table.delete(`support.${userId}`)
                let actualTicket = await table.get('ticket')
                message.channel.delete()
                const supEmbed = new MessageEmbed()
                .setDescription(`<:emojino:796264735649300480> Your ticket #${actualTicket} has been closed! If you wish to open another ticket, feel free to DM me!`)
                .setColor('RED')
                .setFooter(`Hope's Discord Cafe`)
                .setTimestamp()
                return supportUser.send(supEmbed)
            }
        }        
    })
}