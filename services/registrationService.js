const db = require("../config/db")
async function registerEvent(studentId, eventId){
    //check if the event exists

    const [events] = await db.query("SELECT * FROM events WHERE id = ?",[eventId]);

    if(events.length ===0){
        throw new Error("event not found");
    }
    //check if the student has already registered 

    const [existing] = await db.query(
        `SELECT * FROM registrations
        WHERE student_id=? AND event_id=?`,
        [studentId,eventId]
    );

    if(existing.length>0){
        throw new Error ("student has  already registered")
    }

    //check seats availability 
    const [count] = await db.query(
        `SELECT COUNT(*) AS total
        FROM registrations
        WHERE event_id=?`,
        [eventId]
    );
    if(count[0].total >= events[0].max_seats){
        throw new Error("no seats")
    }

    const [result] = await db.query(
        `INSERT INTO registrations(student_id, event_id)
        VALUES(?,?)`,
        [studentId,eventId]
    );

    return{
        id:result.insertId,
        student_id:studentId,
        event_id:eventId
    }
}

async function getAllregistrations() {//registrationn id, user name, event title ,registartion date 
    const [rows] = await db.query(
        `SELECT r.id,
        u.name AS student_name,
        e.title AS event_title,
        r.registration_date
        FROM registrations r
        JOIN users u
        ON r.student_id = u.id
        JOIN events e
        ON r.event_id = e.id`
    );
    return rows;
    
}

async function getRegistrationById(id){
    const [rows] = await db.query(
        `SELECT r.id,
        u.name AS student_name,
        e.title AS event_title,
        r.registration_date
        FROM registrations r
        JOIN users u
        ON r.student_id = u.id
        JOIN events e
        ON r.event_id = e.id
        WHERE r.id=?`,[id]
    )
    return rows[0];
}

async function cancelRegistration(id) {
    const [ result] = await db.query("SELECT * FROM registrations WHERE id=?",[id]);

    return result.affectedRows>0;
    
}

module.exports={
    registerEvent,
    getAllregistrations,
    getRegistrationById,
    cancelRegistration
}