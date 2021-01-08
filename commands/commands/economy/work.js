const Discord = require('discord.js')
const db = require('quick.db')
let ms = require('parse-ms')

module.exports = {
    commands: 'work',
    callback: async (message) => {
        let pad_zero =  num => (num < 10 ? '0': '') + num
        let cooldown = 1.44e+7 //0

        let min = 200
        let max = 500
        let amount = Math.floor(Math.random() * (max - min + 1)) + min

        let lastWork = await db.get(`lastWork.${message.author.id}`)
        let balance = await db.get(`account.${message.author.id}.balance`)
        try{
            if(lastWork !== null && cooldown - (Date.now() - lastWork) > 0){
                let timeObj = ms(cooldown - (Date.now() - lastWork))

                let hours = pad_zero(timeObj.hours).padStart(2, '0')
                    mins = pad_zero(timeObj.minutes).padStart(2, '0')
                    secs = pad_zero(timeObj.seconds).padStart(2, '0')

                let finalTime = `**${hours}:${mins}:${secs}**`
                const embed = new Discord.MessageEmbed()
                .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
                .setDescription(`<:emojino:796264735649300480> Sorry! You have already worked. Please wait until ${finalTime} to do work again!`)
                .setColor('ORANGE')
                .setFooter('Hope\'s Discord Cafe')
                .setTimestamp(new Date())
                return message.channel.send(embed)
            } else {
                db.set(`lastWork.${message.author.id}`, Date.now())
                db.add(`account.${message.author.id}.balance`, amount)
                const embed = new Discord.MessageEmbed()
                .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
                .setDescription(`<:emojiyes:796264735833980968> You did some hard work in your office! You got $${amount}!`)
                .setColor('ORANGE')
                .setFooter('Hope\'s Discord Cafe')
                .setTimestamp(new Date())
                return message.channel.send(embed)
                
            }
        } catch(error) {
            console.log(error)
        }
    }
}