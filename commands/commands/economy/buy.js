const { MessageEmbed } = require("discord.js")
const db = require('quick.db')

module.exports = {
    commands: 'buy',
    cooldown: 5,
    callback: async(message, args) => {
        const item = args.join(' ')
        const balance = await db.get(`account.${message.author.id}.balance`)
        const items = await db.fetch(`inventory.${message.author.id}.${{ items: [] }}`)
        const advRole = message.guild.roles.cache.find(r => r.id === '788430193169662014')
        const donRole = message.guild.roles.cache.find(r => r.id === '795171615393579038')

        if(item === 'Advertising Perm' || item === 'advertising perm'){
            if(balance < 5000) {
                const embed = new MessageEmbed()
                .setDescription(`<:emojino:796264735649300480> You do not have enough money to buy **${item}**! Check your wallet or withdraw from bank!`)
                .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
                .setColor('ORANGE')
                .setFooter('Hope\'s Discord Cafe')
                .setTimestamp()
                message.channel.send(embed)
            } else {
                if(message.member.roles.cache.has(advRole)){
                    const embed = new MessageEmbed()
                    .setDescription(`<:emojino:796264735649300480> You already have the **Advertising Permission** role! Why would you wanna wate another 5k for nothing?`)
                    .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
                    .setColor('ORANGE')
                    .setFooter('Hope\'s Discord Cafe')
                    .setTimestamp()
                    message.channel.send(embed)
                } else {
                    await db.subtract(`account.${message.author.id}.balance`, 5000)
                    await db.push(`inventory.${message.author.id}`, '<:adv_perms:796264657949294592> **Advertising Permissions**\nID:\`adv_perms\` Cost: $5000\nYou need to buy **Advertising Perms** before you promote in <#788413796779294733>!')
                    const embed = new MessageEmbed()
                    .setDescription(`<:emojiyes:796264735833980968> Successfully purchased **${item}**, it costed you $5000!`)
                    .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
                    .setColor('ORANGE')
                    .setFooter('Hope\'s Discord Cafe')
                    .setTimestamp()
                    message.channel.send(embed)
                    message.member.roles.add(advRole)
                }
            }
        } else if(item === 'Donator' || item === 'donator'){
            if(balance < 1000) {
                const embed = new MessageEmbed()
                .setDescription(`<:emojino:796264735649300480> You do not have enough money to buy **${item}**! Check your wallet or withdraw from bank!`)
                .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
                .setColor('ORANGE')
                .setFooter('Hope\'s Discord Cafe')
                .setTimestamp()
                message.channel.send(embed)
            } else {
                if(message.member.roles.cache.has(donRole)){
                    const embed = new MessageEmbed()
                    .setDescription(`<:emojino:796264735649300480> You already have the **Donator [BOT]** role! Why would you wanna wate another 1k for nothing?`)
                    .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
                    .setColor('ORANGE')
                    .setFooter('Hope\'s Discord Cafe')
                    .setTimestamp()
                    message.channel.send(embed)
                } else {
                    await db.subtract(`account.${message.author.id}.balance`, 1000)
                    await db.push(`inventory.${message.author.id}`, '<:donator_role:796264659563970640> **Donator Role**\nID:\`donator_role\` Cost: $1000\nJust another ping role!')
                    const embed = new MessageEmbed()
                    .setDescription(`<:emojiyes:796264735833980968> Successfully purchased **${item}**, it costed you $1000!`)
                    .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
                    .setColor('ORANGE')
                    .setFooter('Hope\'s Discord Cafe')
                    .setTimestamp()
                    message.channel.send(embed)
                    message.member.roles.add(donRole)
                }
            }
        }
    }
}