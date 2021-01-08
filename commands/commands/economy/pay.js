const Discord = require('discord.js')
const db = require('quick.db')

module.exports = {
    commands: ['pay', 'give-money', 'transfer'],
    cooldown: 10,
    callback: (message, args, client) => {
        let user
        if(message.mentions.users.first()){
            user = message.mentions.users.first()
        } else if(args[1]){
            user = message.guild.members.cache.get(args[0]).user
        }

        let balance = db.get(`account.${message.author.id}.balance`)

        if(!user){
            const embed = new Discord.MessageEmbed()
            .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
            .setDescription(`<:emojino:796264735649300480> Please specify a person to give money to!`)
            .setColor('ORANGE')
            .setFooter('Hope\'s Discord Cafe')
            .setTimestamp(new Date())
            return message.channel.send(embed)
        }
        if(user.bot || user === client.user){
            const embed = new Discord.MessageEmbed()
            .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
            .setDescription(`<:emojino:796264735649300480> Sorry! You cannot give money to bots!`)
            .setColor('ORANGE')
            .setFooter('Hope\'s Discord Cafe')
            .setTimestamp(new Date())
            return message.channel.send(embed)
        }
        if(user.id === message.author.id || user === message.author){
            const embed = new Discord.MessageEmbed()
            .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
            .setDescription(`<:emojino:796264735649300480> Sorry! You cannot give money to yourself! Why would you wanna do that?`)
            .setColor('ORANGE')
            .setFooter('Hope\'s Discord Cafe')
            .setTimestamp(new Date())
            return message.channel.send(embed)
        }

        let amount = parseInt(args[1])
        if(!amount){
            const embed = new Discord.MessageEmbed()
            .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
            .setDescription(`<:emojino:796264735649300480> Please specify the number of money you want to give.`)
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
            .setDescription(`<:emojino:796264735649300480> You don't have that much money to give!`)
            .setColor('ORANGE')
            .setFooter('Hope\'s Discord Cafe')
            .setTimestamp(new Date())
            return message.channel.send(embed)
        }
        if(amount < 1){
            const embed = new Discord.MessageEmbed()
            .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
            .setDescription(`<:emojino:796264735649300480> Sorry! You cannot give less than 1 money! Why would you wanna do that?`)
            .setColor('ORANGE')
            .setFooter('Hope\'s Discord Cafe')
            .setTimestamp(new Date())
            return message.channel.send(embed)
        }

        db.add(`account.${user.id}.balance`, amount)
        db.subtract(`account.${message.author.id}.balance`, amount)
        const embed = new Discord.MessageEmbed()
        .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
        .setDescription(`<:emojiyes:796264735833980968> Yay! You have given $${amount} to <@${user.id}>.Now they can finally buy a pizza!`)
        .setColor('ORANGE')
        .setFooter('Hope\'s Discord Cafe')
        .setTimestamp(new Date())
        return message.channel.send(embed)
    }
}