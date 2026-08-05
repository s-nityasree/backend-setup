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

async function updateEvent(id, eventData) {

    const {
        title,
        description,
        event_date,
        venue,
        max_seats,
        created_by
    } = eventData;

    const query = `
        UPDATE events
        SET
        title=?,
        description=?,
        event_date=?,
        venue=?,
        max_seats=?,
        created_by=?
        WHERE id=?
    `;

    const [result] = await db.query(query, [

        title,
        description,
        event_date,
        venue,
        max_seats,
        created_by,
        id

    ]);

    if (result.affectedRows === 0) {

        return null;

    }

    return {

        id,
        title,
        description,
        event_date,
        venue,
        max_seats,
        created_by

    };

}

// Delete Event
async function deleteEvent(id) {

    await db.query(
        "DELETE FROM registrations WHERE event_id=?",
        [id]
    );

    const [result] = await db.query("DELETE FROM events WHERE id = ?",[id])

    if (result.affectedRows === 0) {

        return false;

    }

    return true;

}

module.exports = {

    createEvent,
    getAllEvents,
    getEventById,
    updateEvent,
    deleteEvent

};
