const db = require('../config/db')
async function createEvent(eventData, created_by){
    const {title, description, event_date, venue, max_seats} = eventData;

    const query = `
    INSERT INTO events(
    title, description, event_date,venue,max_seats,created_by)
    VALUES(?,?,?,?,?,?)`;

    const [result] = await db.query(query,[
        title,
        description,
        event_date,
        venue,
        max_seats,
        created_by
    ]);

    return{
        id:result.inserId,
        title,
        description,
        event_date,
        venue,
        max_seats,
        created_by:created_by
    }
}

async function getAllEvents(){
    const [rows] = await db.query("SELECT * FROM events");

    return rows;
}

async function getEventById(id){
    const [rows] = await db.query("SELECT * FROM events WHERE id = ?",[id]);
    return rows[0];
}

module.exports = {
    createEvent,
    getAllEvents,
    getEventById
}