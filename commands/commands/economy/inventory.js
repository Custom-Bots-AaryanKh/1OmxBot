const { MessageEmbed } = require('discord.js')
const db = require('quick.db')

module.exports = {
    commands: ['inv', 'inventory'],
    cooldown: 5,
    callback: async(message, client) => {
        let user
        if(message.mentions.users.first()){
            user = message.mentions.users.first()
        } else {
            user = message.author
        }

        if(user.bot || user === client.user){
            const embed = new MessageEmbed()
            .setDescription(`<:emojino:796264735649300480> Sorry! The mentioned user is a bot and bots cannot have any items!`)
            .setColor('ORANGE')
            .setFooter('Hope\'s Discord Cafe')
            .setTimestamp(new Date())
            return message.channel.send(embed)
        }

        let items = await db.fetch(`inventory.${user.id}`)
        if(items === null || items === undefined) items = 'No Items, Buy Items at **.store**!'

        const embed = new MessageEmbed()
        .setAuthor(`${user.tag}`, user.displayAvatarURL())
        .addField('Inventory', items)
        .setColor('ORANGE')
        .setFooter('Hope\'s Discord Cafe')
        .setTimestamp()
        message.channel.send(embed)
    }
}