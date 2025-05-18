import cron from 'node-cron';

let initialized = false;

export const initCronJob = () =>{
    if(initialized) return;

    cron.schedule('* * * * *',()=>{
        console.log('Cron job runnung every minute');
    });

    initialized = true;
}