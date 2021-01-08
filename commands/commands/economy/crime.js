const Discord = require('discord.js')
const db = require('quick.db')
let ms = require('parse-ms')

module.exports = {
    commands: 'crime',
    callback: async (message) => {
        let pad_zero =  num => (num < 10 ? '0': '') + num
        let cooldown = 1.8e+7
        let result = Math.floor(Math.random() * 10)

        let successmin = 200
        let successmax = 500
        let successamount = Math.floor(Math.random() * (successmax - successmin + 1)) + successmin

        let failmin = 400
        let failmax = 800
        let failamount = Math.floor(Math.random() * (failmax - failmin + 1)) + failmin

        let lastCrime = await db.get(`lastCrime.${message.author.id}`)
        let balance = await db.get(`account.${message.author.id}.balance`)
        try{
            if(lastCrime !== null && cooldown - (Date.now() - lastCrime) > 0){
                let timeObj = ms(cooldown - (Date.now() - lastCrime))

                let hours = pad_zero(timeObj.hours).padStart(2, '0')
                    mins = pad_zero(timeObj.minutes).padStart(2, '0')
                    secs = pad_zero(timeObj.seconds).padStart(2, '0')

                let finalTime = `**${hours}:${mins}:${secs}**`
                const embed = new Discord.MessageEmbed()
                .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
                .setDescription(`<:emojino:796264735649300480> Sorry! You have already did a crime. Please wait until ${finalTime} to do crime again!`)
                .setColor('ORANGE')
                .setFooter('Hope\'s Discord Cafe')
                .setTimestamp(new Date())
                return message.channel.send(embed)
            } else {
                if(result < 4.5){
                    db.set(`lastCrime.${message.author.id}`, Date.now())
                    db.add(`account.${message.author.id}.balance`, successamount)
                    const embed = new Discord.MessageEmbed()
                    .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
                    .setDescription(`<:emojiyes:796264735833980968> You did a crime! You got $${successamount}!`)
                    .setColor('ORANGE')
                    .setFooter('Hope\'s Discord Cafe')
                    .setTimestamp(new Date())
                    return message.channel.send(embed)
                } 
                 if(result > 5.5){
                    db.set(`lastCrime.${message.author.id}`, Date.now())
                    db.subtract(`account.${message.author.id}.balance`, failamount)
                    const embed = new Discord.MessageEmbed()
                    .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
                    .setDescription(`<:emojino:796264735649300480> You tried to rob someone but got caught! You lost $${failamount}!`)
                    .setColor('ORANGE')
                    .setFooter('Hope\'s Discord Cafe')
                    .setTimestamp(new Date())
                    return message.channel.send(embed)
                }
            }
        } catch(error) {
            console.log(error)
        }
    }
}