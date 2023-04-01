const discord = require('discord.js-selfbot-v13')
const client = new discord.Client({checkUpdate: false})
const fs = require('fs')
if (!fs.existsSync("./Data")) fs.mkdirSync("./Data");
if (!fs.existsSync("./config.js")) fs.writeFileSync(`./config.js`, 'module.exports = {\n    token: "" // Put your token here\n}');


const backup = require('discord-backup')
backup.setStorageFolder(__dirname+"/Data/");

require('dotenv').config()

const consolecolor = require('gradient-string')

const q = require('readline-sync')

const config = require('./config')
const token = config.token || process.env.token
if (!token) throw new Error("Please put your token in the config file")

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }


client.login(token).catch(() => console.log(consolecolor("#2871fa", "#6717cd")("Invalid Token ! Put a new token in the config file")))

async function main() {
console.clear()
console.log(consolecolor("#2871fa", "#6717cd")(`
   ::::::::  :::    :::     :::     :::::::::  :::    :::   :::::::::::  ::::::::   ::::::::  :::        
  :+:    :+: :+:    :+:   :+: :+:   :+:    :+: :+:   :+:        :+:     :+:    :+: :+:    :+: :+:        
  +:+        +:+    +:+  +:+   +:+  +:+    +:+ +:+  +:+         +:+     +:+    +:+ +:+    +:+ +:+        
  +#++:++#++ +#++:++#++ +#++:++#++: +#++:++#:  +#++:++          +#+     +#+    +:+ +#+    +:+ +#+        
         +#+ +#+    +#+ +#+     +#+ +#+    +#+ +#+  +#+         +#+     +#+    +#+ +#+    +#+ +#+        
  #+#    #+# #+#    #+# #+#     #+# #+#    #+# #+#   #+#        #+#     #+#    #+# #+#    #+# #+#        
   ########  ###    ### ###     ### ###    ### ###    ###       ###      ########   ########  ##########                                                                                                            
                                         Discord.gg/Shark-Services-V2                                                         
  
  `))
console.log(consolecolor("#2871fa", "#6717cd", "#2871fa", "#6717cd")("========================================================================================================================"))
console.log(consolecolor("#2871fa", "#6717cd")(`                                    [1] - Create A Backup (need permissions)
                                    [2] - Create A Backup (Without Emotes)
                                    [3] - Create A Backup (Without Messages)
                                    [4] - Create A Backup (Without Roles)
                                    [5] - Create A Backup (Without Channels)
                                    [6] - Create A Template (need permissions)
                                    [7] - Exit`))
const e = q.question(consolecolor("#2871fa", "#6717cd")("[?] : "))
if (e === "1"){
    const oldguild = q.question(consolecolor("#2871fa", "#6717cd")("Which server should I copy (ID) : "))
    const guild = client.guilds.cache.get(oldguild)
    if (!guild){
    console.log(consolecolor("#2871fa", "#6717cd")("No guild found"))
    await sleep(5000)
    main()
    }
    const member = guild.members.cache.get(client.user.id)
    if (!member.permissions.has("BAN_MEMBERS")){
    console.log(consolecolor("#2871fa", "#6717cd")("You don't have the Permissions to do that (BAN_MEMBERS)"))
       await sleep(5000)
        main()
    }
    const newguild = q.question(consolecolor("#2871fa", "#6717cd")("In which server should I put the backup : "))
    const backupguild = client.guilds.cache.get(newguild)
    if (!backupguild){
        console.log(consolecolor("#2871fa", "#6717cd")("No guild found"))
        await sleep(5000)
        main()
        }
        console.log(consolecolor("#2871fa", "#6717cd")("[+] Creation of the current backup..."))
        backup.create(guild, {
            jsonBeautify: true
        }).then((backupData) => {
            let backupid = backupData.id
            console.log(consolecolor("#2871fa", "#6717cd")("[+] Loading the current backup..."))
    
            backup.load(backupid, backupguild).then(async() => {
                main()
            }).catch(async (err) => {
                console.log(consolecolor("#2871fa", "#6717cd")("[-] I met an error... Maybe you don't have the Permissions to load the backup..."))
                await sleep(5000)
                main()
            });
    
        });
        
    
    }
    else if (e === "2"){
        const oldguild = q.question(consolecolor("#2871fa", "#6717cd")("Which server should I copy (ID) : "))
        const guild = client.guilds.cache.get(oldguild)
        if (!guild){
        console.log(consolecolor("#2871fa", "#6717cd")("No guild found"))
        await sleep(5000)
        main()
        }
        
        const newguild = q.question(consolecolor("#2871fa", "#6717cd")("In which server should I put the backup : "))
        const backupguild = client.guilds.cache.get(newguild)
        if (!backupguild){
            console.log(consolecolor("#2871fa", "#6717cd")("No guild found"))
            await sleep(5000)
            main()
            }
            console.log(consolecolor("#2871fa", "#6717cd")("[+] Creation of the current backup..."))
            backup.create(guild, {
                jsonBeautify: true,
                doNotBackup: [ "emojis", "bans" ],
            }).then((backupData) => {
                let backupid = backupData.id
                console.log(consolecolor("#2871fa", "#6717cd")("[+] Loading the current backup..."))
        
                backup.load(backupid, backupguild).then(async() => {
                    main()
                }).catch(async (err) => {
                    console.log(consolecolor("#2871fa", "#6717cd")("[-] I met an error... Maybe you don't have the permissions to load the backup..."))
                    await sleep(5000)
                    main()
                });
        
            });
            
        
        }
        else if (e === "3"){
            const oldguild = q.question(consolecolor("#2871fa", "#6717cd")("Which server should I copy (ID) : "))
            const guild = client.guilds.cache.get(oldguild)
            if (!guild){
            console.log(consolecolor("#2871fa", "#6717cd")("No guild found"))
            await sleep(5000)
            main()
            }
            
            const newguild = q.question(consolecolor("#2871fa", "#6717cd")("In which server should I put the backup : "))
            const backupguild = client.guilds.cache.get(newguild)
            if (!backupguild){
                console.log(consolecolor("#2871fa", "#6717cd")("No guild found"))
                await sleep(5000)
                main()
                }
                console.log(consolecolor("#2871fa", "#6717cd")("[+] Creation of the current backup..."))
                backup.create(guild, {
                    maxMessagesPerChannel: 0,
                    doNotBackup: [ "bans" ],
                    jsonBeautify: true,
                }).then((backupData) => {
                    let backupid = backupData.id
                    console.log(consolecolor("#2871fa", "#6717cd")("[+] Loading the current backup..."))
            
                    backup.load(backupid, backupguild).then(async() => {
                        main()
                    }).catch(async (err) => {
                        console.log(consolecolor("#2871fa", "#6717cd")("[-] I met an error... Maybe you don't have the permissions to load the backup..."))
                        await sleep(5000)
                        main()
                    });
            
                });
                
            
            }
            else if (e === "4"){
                const oldguild = q.question(consolecolor("#2871fa", "#6717cd")("Which server should I copy (ID) : "))
                const guild = client.guilds.cache.get(oldguild)
                if (!guild){
                console.log(consolecolor("#2871fa", "#6717cd")("No guild found"))
                await sleep(5000)
                main()
                }
                 
                const newguild = q.question(consolecolor("#2871fa", "#6717cd")("In which server should I put the backup : "))
                const backupguild = client.guilds.cache.get(newguild)
                if (!backupguild){
                    console.log(consolecolor("#2871fa", "#6717cd")("No guild found"))
                    await sleep(5000)
                    main()
                    }
                    console.log(consolecolor("#2871fa", "#6717cd")("[+] Creation of the current backup..."))
                    backup.create(guild, {
                        jsonBeautify: true,
                        doNotBackup: [ "roles", "bans"  ],
                    }).then((backupData) => {
                        let backupid = backupData.id
                        console.log(consolecolor("#2871fa", "#6717cd")("[+] Loading the current backup..."))
                
                        backup.load(backupid, backupguild).then(async() => {
                            main()
                        }).catch(async (err) => {
                            console.log(consolecolor("#2871fa", "#6717cd")("[-] I met an error... Maybe you don't have the permissions to load the backup..."))
                            await sleep(5000)
                            main()
                        });
                
                    });
                    
                
                }
                else if (e === "5"){
                    const oldguild = q.question(consolecolor("#2871fa", "#6717cd")("Which server should I copy (ID) : "))
                    const guild = client.guilds.cache.get(oldguild)
                    if (!guild){
                    console.log(consolecolor("#2871fa", "#6717cd")("No guild found"))
                    await sleep(5000)
                    main()
                    }
                     
                    const newguild = q.question(consolecolor("#2871fa", "#6717cd")("In which server should I put the backup : "))
                    const backupguild = client.guilds.cache.get(newguild)
                    if (!backupguild){
                        console.log(consolecolor("#2871fa", "#6717cd")("No guild found"))
                        await sleep(5000)
                        main()
                        }
                        console.log(consolecolor("#2871fa", "#6717cd")("[+] Creation of the current backup..."))
                        backup.create(guild, {
                            jsonBeautify: true,
                            doNotBackup: [ "channels", "bans"  ],
                        }).then((backupData) => {
                            let backupid = backupData.id
                            console.log(consolecolor("#2871fa", "#6717cd")("[+] Loading the current backup..."))
                    
                            backup.load(backupid, backupguild).then(() => {
                                main()
                            }).catch(async (err) => {
                                console.log(consolecolor("#2871fa", "#6717cd")("[-] I met an error... Maybe you don't have the permissions to load the backup..."))
                                await sleep(5000)
                                main()
                            });
                    
                        });
                        
                    
                    }
                    else if (e === "6"){
                        const oldguild = q.question(consolecolor("#2871fa", "#6717cd")("In which server should I create the template (ID) : "))
                        const guild = client.guilds.cache.get(oldguild)
                        if (!guild){
                        console.log(consolecolor("#2871fa", "#6717cd")("No guild found"))
                        await sleep(5000)
                        main()
                        }
                        let templatename = q.question(consolecolor("#2871fa", "#6717cd")("What is the name of the template? : "))
                        if (!templatename) templatename = "github/002-sans"
                        guild.createTemplate(templatename)
                        .then((g) => {
                            console.log(consolecolor("#2871fa", "#6717cd")(`[+] Template link: https://discord.new/${g.code}`))
                            const slt = q.question("Press the enter key to return to the menu")
                            if (slt){
                                main()
                            }
                        })
                        .catch(() => console.log(consolecolor("#2871fa", "#6717cd")(`[-] I can't create a template for this server. Maybe there is already one.`)))
                    }
                    else if (e === '7'){
                        process.exit(1000)
                    }
                    else {
                        console.log(consolecolor("#2871fa", "#6717cd")(`Missclick ??`))
                        await sleep(5000)
                        main()
                    }
}

client.on('ready', () => main())
