const { MessageEmbed } = require("discord.js")

module.exports = {
    commands: ['shop', 'store'],
    callback: (message, args) => {
        const embed = new MessageEmbed()
        .setTitle('Type `.buy [item name]` to buy')
        .setDescription(
            `**<:adv_perms:796264657949294592> Advertising Permissions:**\nID: \`adv_perms\`\nRequired: $5000\nYou need to buy **Advertising Perms** before you promote in <#788413796779294733>!\n\n` + //self-promo id
            `**<:donator_role:796264659563970640> Donator Role:**\nID: \`donator_role\`\nRequired: $1000\nJust a special role for all the donators!`
        )
        .setFooter('Shop | Hope\'s Discord Cafe')
        .setTimestamp()
        .setColor('GREEN')
        message.channel.send(embed)
    }
}