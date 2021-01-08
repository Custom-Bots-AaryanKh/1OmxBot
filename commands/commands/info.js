const { MessageEmbed } = require('discord.js')
const { Menu } = require('discord.js-menu')
const moment = require('moment')

module.exports = {
    commands: 'info',
    callback: (message, args) => {
        const main = new MessageEmbed()
        .setTitle('Hope\'s Discord Cafe Info!')
        .setTimestamp()
        .setFooter(`Hope's Discord Cafe | Info Page 1/4`)
        .setColor('ORANGE')
        .setDescription(
            `**Hope's Discord Cafe** is a custom bot made by [AaryanKh#4532](https://dsc.gg/aaryankh) for Edge#1234!\n\n` +
            `This bot has many features like **Moderation Commands**, **Auto-Mod**, **Economy System** and __Modmail__!\n` +
            `This bot is made for their special server called as [**Hope's Discord Cafe**](https://dsc.gg/hope's_cafe) and made for __anti-spam__, and __other moderation features__!\n` +
            `This bot have a **economy/banking system** too which is a great __entertainment__ source!\n` +
            `:warning: **IMPORTANT:** This bot is only for [**Hope's Discord Cafe**](https://dsc.gg/hope's_cafe) and not for others. Please don't distribute!`
        )

        const botinfo = new MessageEmbed()
        .setTitle('Hope\'s Discord Cafe Developer & Bot Info!')
        .setTimestamp()
        .setFooter(`Hope's Discord Cafe | Info Page 2/4`)
        .setColor('ORANGE')
        .addFields(
            {
                name: 'Developer',
                value: 'AaryanKh#4532',
                inline: true,
            },
            {
                name: 'Library',
                value: 'Discord.JS',
                inline: true,
            },
            {
                name: 'Support',
                value: '[Hope\'s Discord Cafe](https://dsc.gg/hope\'s_cafe)',
            },
            {
                name: 'Bot Categories',
                value: 'Moderation, Economy and Modmail!'
            },
            {
                name: 'Do you want your own custom bot?',
                value: 'Click on this link: [Join AaryanKh\'s Support Server](https://dsc.gg/aaryankh)'
            }
        )

        const userinfo = new MessageEmbed()
        .setTitle('Hope\'s Discord Cafe User Info!')
        .setTimestamp()
        .setFooter(`Hope's Discord Cafe | Info Page 3/4`)
        .setColor(message.member.roles.highest.color)
        .addFields(
            {
                name: 'Name',
                value: message.author.tag,
                inline: true
            },
            {
                name: 'User ID',
                value: message.author.id,
                inline: true
            },
            {
                name: 'Joined At',
                value: moment(message.guild.member(message.author).joinedAt).format("dddd, MMMM Do YYYY, h:mm a")
                
            },
            {
                name: 'Created At',
                value: moment(message.author.createdAt).format("dddd, MMMM Do YYYY, h:mm a")
                
            },
            {
                name: 'Roles',
                value: message.member.roles ? message.member.roles.cache.map(r => `${r}`).join(' | ') : '',
            },
            {
                name: 'Highest Role',
                value: message.guild.member(message.author).roles.highest.name
            }
        )

        const serverinfo = new MessageEmbed()
        .setTitle('Hope\'s Discord Cafe Server Info!')
        .setTimestamp()
        .setFooter(`Hope's Discord Cafe | Info Page 4/4`)
        .setColor('ORANGE')
        .addFields(
            {
                name: 'Server Name',
                value: message.guild.name,
                inline: true
            },
            {
                name: 'Server ID',
                value: message.guild.id,
                inline: true
            },
            {
                name: 'Created At',
                value: moment(message.guild.createdAt).format("MMMM Do YYYY, h:mm a"),
                inline: true
            },
            {
                name: 'Owner',
                value: 'Edge#1234',
                inline: true
            },
            {
                name: 'Owner ID',
                value: '791583586448965642',
                inline: true
            },
            {
                name:  'Members',
                value: message.guild.memberCount,
                inline: true
            },
            {
                name: 'Roles',
                value: message.guild.roles.cache.size,
                inline: true
            },
            {
                name: 'Channels',
                value: message.guild.channels.cache.size,
                inline: true
            },
            {
                name: 'Description',
                value: message.guild.description ? message.channel.description : 'No Description!'
            }
        )

        let infoMenu = new Menu(message.channel, message.author.id, [
            {
                name: 'main',
                content: main,
                reactions: {
                    '▶' : 'botinfo',
                    '796264735649300480' : 'delete'
                }
            },
            {
                name: 'botinfo',
                content: botinfo,
                reactions: {
                    '◀' : 'main',
                    '▶' : 'userinfo',
                    '796264735649300480' : 'delete'
                }
            },
            {
                name: 'userinfo',
                content: userinfo,
                reactions: {
                    '◀' : 'botinfo',
                    '▶' : 'serverinfo',
                    '796264735649300480' : 'delete'
                }
            },
            {
                name: 'serverinfo',
                content: serverinfo,
                reactions: {
                    '◀' : 'userinfo',
                    '796264735649300480' : 'delete'
                }
            }
        ])

        infoMenu.start()
    }
}