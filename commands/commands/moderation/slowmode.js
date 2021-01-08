const { MessageEmbed } = require("discord.js")

module.exports = {
    commands: ['slowmode', 'sm'],
    cooldown: 10,
    callback: (message, args) => {
        if(message.member.hasPermission('MANAGE_CHANNELS')){
            const number = args[0]
            if(!number){
                const embed = new MessageEmbed()
                .setDescription(`<:emojino:796264735649300480> Please specify the number in seconds to make slowmode`)
                .setColor('ORANGE')
                .setFooter(`Hope's Discord Cafe`)
                .setTimestamp()
                message.channel.send(embed)
            }else if(number){
                message.channel.setRateLimitPerUser(number)
                const embed = new MessageEmbed()
                .setDescription(`<:emojiyes:796264735833980968> Successfully set the slowmode of the channel to ${number} seconds!`)
                .setColor('ORANGE')
                .setFooter('Hope\'s Discord Cafe')
                .setTimestamp(new Date())
                message.channel.send(embed)
            }
        } else {
            const embed = new MessageEmbed()
            .setDescription(`<:emojino:796264735649300480> You do not have Permissions to use this command!`)
            .setColor('ORANGE')
            .setFooter('Hope\'s Discord Cafe')
            .setTimestamp()
            message.channel.send(embed)
        }
        
    }
}