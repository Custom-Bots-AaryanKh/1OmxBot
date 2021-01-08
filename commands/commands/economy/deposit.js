const db = require('quick.db')
const Discord = require('discord.js')

module.exports = {
    commands: ['dep', 'deposit'],
    cooldown: 5,
    callback: (message, args) => {
        let balance = db.get(`account.${message.author.id}.balance`)

        let amount = parseInt(args[0])
        if(!amount){
            const embed = new Discord.MessageEmbed()
            .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
            .setDescription(`<:emojino:796264735649300480> Please specify the number of money you want to deposit.`)
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

        if(!balance || balance === 0){
            const embed = new Discord.MessageEmbed()
            .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
            .setDescription(`<:emojino:796264735649300480> Check your wallet first! You don't have any money`)
            .setColor('ORANGE')
            .setFooter('Hope\'s Discord Cafe')
            .setTimestamp(new Date())
            return message.channel.send(embed)
        }
        if(amount > balance){
            const embed = new Discord.MessageEmbed()
            .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
            .setDescription(`<:emojino:796264735649300480> You don't have that much money to deposit!`)
            .setColor('ORANGE')
            .setFooter('Hope\'s Discord Cafe')
            .setTimestamp(new Date())
            return message.channel.send(embed)
        }
        if(amount < 1){
            const embed = new Discord.MessageEmbed()
            .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
            .setDescription(`<:emojino:796264735649300480> Sorry! You cannot deposit less than 1 money! Why would you wanna do that?`)
            .setColor('ORANGE')
            .setFooter('Hope\'s Discord Cafe')
            .setTimestamp(new Date())
            return message.channel.send(embed)
        }

        db.add(`account.${message.author.id}.bank`, amount)
        db.subtract(`account.${message.author.id}.balance`, amount)
        const embed = new Discord.MessageEmbed()
        .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
        .setDescription(`<:emojiyes:796264735833980968> Successfully deposited $${amount}!`)
        .setColor('ORANGE')
        .setFooter('Hope\'s Discord Cafe')
        .setTimestamp(new Date())
        return message.channel.send(embed)
    }
}