const db = require('quick.db')
const Discord = require('discord.js')

module.exports = {
    commands: ['with', 'withdraw'],
    cooldown: 5,
    callback: (message, args) => {
        let bank = db.get(`account.${message.author.id}.bank`)

        let amount = parseInt(args[0])
        if(!amount){
            const embed = new Discord.MessageEmbed()
            .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
            .setDescription(`<:emojino:796264735649300480> Please specify the number of money you want to withdraw.`)
            .setColor('ORANGE')
            .setFooter('Hope\'s Discord Cafe')
            .setTimestamp(new Date())
            return message.channel.send(embed)
        }
        if(isNaN(amount)){
            const embed = new Discord.MessageEmbed()
            .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
            .setDescription(`<:emojino:796264735649300480> That is an invaild number of money.`)
            .setColor('ORANGE')
            .setFooter('Hope\'s Discord Cafe')
            .setTimestamp(new Date())
            return message.channel.send(embed)
        }

        if(!bank || bank === 0){
            const embed = new Discord.MessageEmbed()
            .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
            .setDescription(`<:emojino:796264735649300480> Check your bank first! You don't have any money`)
            .setColor('ORANGE')
            .setFooter('Hope\'s Discord Cafe')
            .setTimestamp(new Date())
            return message.channel.send(embed)
        }
        if(amount > bank){
            const embed = new Discord.MessageEmbed()
            .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
            .setDescription(`<:emojino:796264735649300480> You don't have that much money to withdraw!`)
            .setColor('ORANGE')
            .setFooter('Hope\'s Discord Cafe')
            .setTimestamp(new Date())
            return message.channel.send(embed)
        }
        if(amount < 1){
            const embed = new Discord.MessageEmbed()
            .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
            .setDescription(`<:emojino:796264735649300480> Sorry! You cannot withdraw less than 1 money! Why would you wanna do that?`)
            .setColor('ORANGE')
            .setFooter('Hope\'s Discord Cafe')
            .setTimestamp(new Date())
            return message.channel.send(embed)
        }

        db.add(`account.${message.author.id}.balance`, amount)
        db.subtract(`account.${message.author.id}.bank`, amount)
        const embed = new Discord.MessageEmbed()
        .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
        .setDescription(`<:emojiyes:796264735833980968> Successfully withdrawn $${amount}!`)
        .setColor('ORANGE')
        .setFooter('Hope\'s Discord Cafe')
        .setTimestamp(new Date())
        return message.channel.send(embed)
    }
}