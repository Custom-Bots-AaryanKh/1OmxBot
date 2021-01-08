const { MessageEmbed } = require('discord.js')
const fs = require('fs')
const ms = require('ms')

module.exports = { 
    commands: ['list-warnings', 'lw'],
    cooldown: 3,
    callback: (message) => {
        let warns = JSON.parse(fs.readFileSync('commands/commands/moderation/warnings.json', 'utf-8'))
        const user = message.mentions.members.first()
        if(!user){
            const embed = new MessageEmbed()
            .setDescription(`<:emojino:796264735649300480> Please mention a member to list-warnings of!`)
            .setColor('ORANGE')
            .setFooter('Hope\'s Discord Cafe')
            .setTimestamp()
            message.channel.send(embed)
        }

        if(!warns[`${user.id}`]) warns[user.id] = {
            warns: 0
        }

        const embed = new MessageEmbed()
        .setDescription(`**<:emojiyes:796264735833980968> Number of warnings of member _${user.user.username}:_** ${warns[`${user.id}, ${message.guild.id}`].warns}`)
        .setColor('ORANGE')
        .setFooter('Hope\'s Discord Cafe')
        .setTimestamp()
        message.channel.send(embed)
    }
}