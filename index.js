import rpc from 'discord-rpc';
import Config from './config.json' assert{type:'json'};
const client = new rpc.Client({
    transport : 'ipc',
});
import exsta from 'gamedig'

client.login({
    clientId : Config.Application_ID
}).catch(console.error);

client.on('ready', () => {
    
    console.log('\x1b[32m%s\x1b[0m', 'Successfully connected to the API.');

    setInterval(() => {
        exsta.query({
            type: 'mtasa',
            host: Config.MTA.SERVER_IP,
            port: Config.MTA.SERVER_PORT
        }).then((state) => {
            const currentPlayers = state.raw.numplayers;
            const maxPlayers = state.maxplayers;
            const playerPercentage = ((currentPlayers / maxPlayers) * 100).toFixed(2);
        client.request('SET_ACTIVITY', {
            pid: process.pid,
            activity: {
                details: `🌎 Username: ${Config.MTA.SERVER_USERNAME}`,
                state: `🟢 ${currentPlayers}/${maxPlayers} (${playerPercentage}%) | Ping: ${state.ping}ms`,
                assets: {
                    large_image: Config.Images.Large_Image_URL,
                    large_text: Config.Images.Large_Image_Text,
                    small_image: Config.Images.Small_Image_URL,
                    small_text: Config.Images.Small_Image_Text
                },
                buttons: [{
                        label: Config.Buttons.Button1,
                        url: Config.Buttons.Button1_URL || "https://discord.gg/altyapilar",
                    },
                    { label: Config.Buttons.Button2, url: Config.Buttons.Button2_URL || "https://discord.gg/altyapilar" }
                ]
            }
        })
        }).catch(err => {
            return
        });
    }, 2000);
    
})