const { MessageEmbed } = require('discord.js')
const { Menu } = require('discord.js-menu')

module.exports = {
    commands: 'help',
    cooldown: 5,
    callback: (message) => {
        const eMain = new MessageEmbed()
        .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
        .setColor('ORANGE')
        .setFooter('Hope\'s Discord Cafe')
        .setTimestamp()
        .setTitle('Help Menu for Hope\'s Discord Cafe!')
        .setDescription('Welcome, this is __**Hope\'s Discord Cafe!**__ This Bot have **moderation** and **economy** commands and __planning to add more__!\n\n' +
            `We provide **__auto-mod__**, __**moderation commands**__, **__economy commands__**, **__banking system__**, __**muting system**__ and **__many more!__**\n\n` +
            `⚒ **Moderation:** We provide a lot of moderation features like **Auto-Mod** and **Mod-Commands!**\n` +
            `📬 **Modmail:** We have a mod-mail system, so if you DM me, the messages will be sent to a staff-channel!\n` +
            `💵 **Economy:** We have a economy system which allows you to make money by specific commands and use it in the shop!\n` +
            `**⏭ Extras:** help, info, member-count, ping, say\n\n` +
            'For more help react to ⚒, 📬 or 💵'
        )

        const eMod = new MessageEmbed()
        .setTitle('Moderation Help Menu for Hope\'s Discord Cafe')
        .setColor('ORANGE')
        .setTimestamp()
        .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
        .setFooter(`Hope's Discord Cafe`)
        .setDescription(
            `⚒ **Moderation:** We provide a lot of moderation features like **Auto-Mod** and **Mod-Commands!**\n` +
            `🔨 **Auto-Mod** includes **Anti-Link**, **Anti-Spam**, **Banned Words** and __many more__\n\n` +
            `:magic_wand: **Moderation Commands:** We provide a lot of moderation commands for server moderators...\n\n` +
            
            `:mechanical_leg: **Kick:** Kicks a member!\n` + 
            `:hammer_pick: **Ban:** Bans a member!\n` + 
            `:negative_squared_cross_mark: **Unban:** Unbans a member!\n` +
            `:no_entry_sign: **Mute:** Mutes a member!\n` + 
            `:o: **Unmute:** Unmutes a member!\n` + 
            `:anger: **Warn:** Warns a member! The more warns, the higher punishment!\n` +
            `:hotsprings: **Clear-Warns:** Clear warnings of a member!\n` +
            `:memo: **List-Warns:** List the warnings of a member\n\n` + 

            `:white_check_mark: **Usage for all Commands:** [command name] [mentioned user] (optional reason)`
        )

        const eMail = new MessageEmbed()
        .setTitle('Mod-Mail Help Menu for Hope\'s Discord Cafe')
        .setColor('ORANGE')
        .setTimestamp()
        .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
        .setFooter(`Hope's Discord Cafe`)
        .setDescription(
            `📬 **Modmail:** We have a mod-mail system, so if you DM me, the messages will be sent to a staff-channel!\n` +
            `✉ **In Modmail**, you just have to DM me and your message will be sent in a particular channel of yours, which can only be seen by staff!\n` +
            `Dont send random unwanted messages.. or you may get warned....\n` +
            `Ask questions of the topic of the server or other sever-related questions!\n` +
            `**The Advantages?**: You may not have to ping the staff for your complaints or wait for staff to see your messages\n` +
            `**Instead:** It will create a seperate channel for you that only staff can see and they can talk to you via me!`
        )

        const eMoail = new MessageEmbed()
        .setTitle('Mod-Mail Commands Help Menu for Hope\'s Discord Cafe')
        .setColor('ORANGE')
        .setTimestamp()
        .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
        .setFooter(`Hope's Discord Cafe`)
        .setDescription(
            `📬 **Modmail:** We have a mod-mail system, so if you DM me, the messages will be sent to a staff-channel!\n` +
            `📨 **Modmail Commands:** Below are some of the commands which you can run within a modmail thread!\n\n` +
            `:repeat: **Reply:** You can reply to the user by typing \`.reply\` in a modmail thread!\n` +
            `:repeat_one: **Anonymous Reply:** You can anonymously reply to the user(Your name won't be shown) by typing \`.areply\` in a modmail thread!\n` +
            `:id: **Get ID:** You can get ID of the user by typing \`.id\` in a modmail thread!\n` +
            `:pause_button: **Pause:** You can Pause the thread (ie. The user won't be able to send any messages through modmail) by typing \`.pause\` in a modmail thread!\n` +
            `:arrow_forward: **Continue:** You can __Unpause or Continue__ a modmail thread (if paused) by typing \`.continue\` in a modmail thread!\n` +
            `<:emojino:796264735649300480> **Block:** You can block/blacklist a user by typing \`.block\` in a modmail thread!\n` +
            `<:emojiyes:791264913649303603> **Unblock:** You can __unblock__ a user (if blocked) by typing \`.unblock\` in a modmail thread!\n` +
            `:octagonal_sign: **Complete/Close:** You can close a thread (ie. user can't send more message in that channel after this BUT can create a new thread) by typing \`.complete\` in a modmail thread!` 
        )

        const eEcon = new MessageEmbed()
        .setTitle('Economy Commands Help Menu for Hope\'s Discord Cafe')
        .setColor('ORANGE')
        .setTimestamp()
        .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
        .setFooter(`Hope's Discord Cafe`)
        .setDescription(
            `💵 **Economy:** We have a economy system which allows you to make money by specific commands and use it in the shop!\n` +
            `:coin: We have a lot of economy related commands...\n` +
            `:dollar: **Balance:** See how much money you have!\n` +
            `:briefcase: **Work:** Do good deeds and earn money from $200 to $500!\n` + 
            `:spy: **Crime:** Do bad deeds and earn money. :name_badge: *CAUTION:* You might lose money too if you got arrested!\n` +
            `:coin: **Daily:** Earn your daily rewards from $500 to $1300!\n` + 
            `:joystick: **Gamble:** Basic and Non-Gamed Gamble Command!\n` + 
            `:trophy: **Leaderboard:** See Global Leaderboard and who you are against!\n` + 
            `:moneybag: **Pay:** Pay some loans or gift your friends some money!\n` + 
            `:ninja: **Rob:** Rob other players for $1000 every day! But you could get caught and be fined $1000!\n` +
            `:inbox_tray: **Deposit:** Deposit a specific amount of money or all money to the bank!\n` + 
            `:outbox_tray: **WithDraw:** Withdraw a specific amount of money or all money from the bank!\n` 
        )

        let helpMenu = new Menu(message.channel, message.author.id, [
            {
                name: 'main',
                content: eMain,
                reactions: {
                    '⚒' : 'moderation',
                    '📬': 'modmail',
                    '💵': 'economy',
                    '796264735649300480' : 'delete'
                }
            },
            {
                name: 'moderation',
                content: eMod,
                reactions: {
                    '◀' : 'main',
                    '796264735649300480' : 'delete'
                    
                }
            },
            {
                name: 'modmail',
                content: eMail,
                reactions: {
                    '◀' : 'main',
                    '▶': 'modmail-2',
                    '796264735649300480' : 'delete'
                    
                } 
            },
            {
                name: 'modmail-2',
                content: eMoail,
                reactions: {
                    '◀': 'modmail',
                    '⏪': 'main',
                    '796264735649300480' : 'delete'
                }
            },
            {
                name: 'economy',
                content: eEcon,
                reactions: {
                    '◀' : 'main',
                    '796264735649300480' : 'delete'
                }
            }
        ])
        helpMenu.start()
    }
}