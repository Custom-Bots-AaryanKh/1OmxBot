const Discord = require('discord.js')
const db = require('quick.db')
const ms = require('parse-ms')

module.exports = {
    commands: 'gamble',
    callback: async(message, args) => {
        const amount = parseInt(args[0])
        const result = Math.floor(Math.random() * 10)
        const balance = db.get(`account.${message.author.id}.balance`)

        if(!amount){
            const embed = new Discord.MessageEmbed()
            .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
            .setDescription(`<:emojino:796264735649300480> Please specify the number of money to gamble first!`)
            .setColor('ORANGE')
            .setFooter('Hope\'s Discord Cafe')
            .setTimestamp(new Date())
            return message.channel.send(embed)
        }
        if(isNaN(amount)){
            const embed = new Discord.MessageEmbed()
            .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
            .setDescription(`<:emojino:796264735649300480> Please specify a valid number of money to gamble!`)
            .setColor('ORANGE')
            .setFooter('Hope\'s Discord Cafe')
            .setTimestamp(new Date())
            return message.channel.send(embed)
        }
        if(amount > balance){
            const embed = new Discord.MessageEmbed()
            .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
            .setDescription(`<:emojino:796264735649300480> You don't have enough money to gamble! Please check your wallet!`)
            .setColor('ORANGE')
            .setFooter('Hope\'s Discord Cafe')
            .setTimestamp(new Date())
            return message.channel.send(embed)
        }

        if(amount <= 99){
            const embed = new Discord.MessageEmbed()
            .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
            .setDescription(`<:emojino:796264735649300480> You cannot gamble less than 100 money!`)
            .setColor('ORANGE')
            .setFooter('Hope\'s Discord Cafe')
            .setTimestamp(new Date())
            return message.channel.send(embed)
        }
        
        let cooldown = 13000
        let pad_zero = num => (num < 10 ? '0': '')
        let lastGamble = await db.get(`lastGamble.${message.author.id}`)

        if(lastGamble !== null && cooldown - (Date.now() - lastGamble) > 0){
            let timeObj = ms(cooldown - (Date.now() - lastGamble))
            let second = pad_zero(timeObj.seconds).padStart(2, '0')
            const embed = new Discord.MessageEmbed()
            .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
            .setDescription(`<:emojino:796264735649300480> You are gambling too fast! Please wait **${second}** second(s) before gambling again!`)
            .setColor('ORANGE')
            .setFooter('Hope\'s Discord Cafe')
            .setTimestamp(new Date())
            return message.channel.send(embed)
        }

        if(result < 5){
            await db.set(`lastGamble.${message.author.id}`, Date.now())
            await db.subtract(`account.${message.author.id}.balance`, amount)
            const embed = new Discord.MessageEmbed()
            .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
            .setDescription(`<:emojino:796264735649300480> Oopsie! You lost this gamble along with your $${amount}! Better Luck next time!`)
            .setColor('ORANGE')
            .setFooter('Hope\'s Discord Cafe')
            .setTimestamp(new Date())
            return message.channel.send(embed)
        } else if(result > 5){
            await db.set(`lastGamble.${message.author.id}`, Date.now())
            await db.add(`account.${message.author.id}.balance`, amount)
            const embed = new Discord.MessageEmbed()
            .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
            .setDescription(`<:emojiyes:796264735833980968> Yay! You won the gamble with getting your money doubled! Enjoy!`)
            .setColor('ORANGE')
            .setFooter('Hope\'s Discord Cafe')
            .setTimestamp(new Date())
            return message.channel.send(embed)
        }
    }
}