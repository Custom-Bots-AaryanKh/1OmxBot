const { MessageEmbed } = require('discord.js')
// const { bannedWords } = ['test1', 'test2']

module.exports = (client) => {
    client.on('message', (message) => {
        if(!message.member.hasPermission('MANAGE_MESSAGES') && message.channel.type !== "dm"){
            const channel = message.guild.channels.cache.find(ch => ch.name === 'mod-logs').id
            const channell = message.guild.channels.cache.get(channel)

            if(message.member.user.bot){
                return
            }

            if(
                message.content.includes('fuck') || 
                message.content.includes('shit') || 
                message.content.includes('piss') || 
                message.content.includes('dick') ||
                message.content.includes('ass') ||  
                message.content.includes('bitch') || 
                message.content.includes('bastard') || 
                message.content.includes('cunt') || 
                message.content.includes('bollocks') || 
                message.content.includes('bugger') || 
                message.content.includes('bloody') || 
                message.content.includes('choad') || 
                message.content.includes('nig') || 
                message.content.includes('shag') ||
                message.content.includes('suck')
            )
            {
                message.delete()
                const noEmbed = new MessageEmbed()
                .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
                .setDescription('<:emojino:796264735649300480> You are not allowed to use this word because its banned!')
                .setColor('RED')
                .setFooter(`Hope's Discord Cafe`)
                .setTimestamp()
                message.channel.send(noEmbed)
                const embed = new MessageEmbed()
                .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
                .setFooter('Hope\'s Discord Cafe')
                .setTimestamp()
                .setColor('RED')
                .setDescription(
                    `**Message sent by <@${message.author.id}> got deleted in <#${message.channel.id}>**\n` + 
                    `${message.content}`
                )
                .addFields(
                    {
                        name: 'Member ID',
                        value: message.author.id,
                    },
                    {
                        name: 'Reason',
                        value: 'Banned Word!'
                    }
                )
                channell.send(embed)
            }
        }else{
            return
        }
    })
}