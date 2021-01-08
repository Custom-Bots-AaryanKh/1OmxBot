const { MessageEmbed } = require("discord.js")

module.exports = {
    commands: ['member-count', 'mc'],
    callback: (message) => {
        const embed = new MessageEmbed()
        .setDescription(`<:emojiyes:796264735833980968> Members: ${message.guild.memberCount.toLocaleString()}`)
        .setColor('ORANGE')
        .setFooter(`Hope's Discord Cafe`)
        .setTimestamp()
        .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
        message.channel.send(embed)
    }
}