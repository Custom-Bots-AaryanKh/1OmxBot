const Discord = require('discord.js')
const client = new Discord.Client()
const { prefix, token } = require('./config.json')

const loadCommands = require('./commands/load-commands')
const loadFeatures = require('./features/load-features')
const modmail = require('./features/features/modmail')
const bannedWords = require('./features/features/auto-mod/banned-words')

client.on('ready', () => {
    console.log('The Bot is Online!')
    client.user.setActivity(`${prefix}help`, {type: 'LISTENING'}).catch(console.error)

    loadCommands(client)
    loadFeatures(client)
    modmail(client)
    bannedWords(client)
})

client.login(token)