const { MessageEmbed } = require("discord.js")

module.exports = {
    commands: 'say',
    cooldown: 3,
    callback: (message) => {
        const name = message.content.replace('.say', '')
        if(!name){
            const embed = new MessageEmbed()
            .setDescription(`<:emojino:796264735649300480> Please type something to say!`)
            .setColor('ORANGE')
            .setFooter('Hope\s Discord Cafe')
            .setTimestamp()
            message.channel.send(embed)
            return
        } else if(name){
            const embed = new MessageEmbed()
            .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
            .setDescription(`${name}`)
            .setFooter('Hope\s Discord Cafe')
            .setColor('RANDOM')
            .setTimestamp()
            message.channel.send(embed)
            message.delete()
        }
    }
}