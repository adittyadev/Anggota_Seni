const API_URL =
"https://script.google.com/macros/s/AKfycbz5UMKP_Tg6pG2Ld9pzXGZGrpW0BHoN9ky1IUKEAmJGP_LVFOsNLSxAIa4q1vEC0euOjQ/exec";

async function sendData(data){

    try{

        const response =
        await fetch(API_URL,{

            method:"POST",

            body:JSON.stringify(data)

        });

        return await response.text();

    }

    catch(error){

        console.log(error);

        return false;

    }

}