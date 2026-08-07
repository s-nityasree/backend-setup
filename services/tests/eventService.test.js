jest.mock("../../config/db");

const db=require("../../config/db")
const eventService = require("../eventService")

describe("eventService" , ()=>{
    beforeEach(()=>{
        jest.clearAllMocks();
    });

    test("createEvent inserts an event and returns it with a new id", async()=>{
        db.query.mockResolvedValueOnce([{insertId : 7}]);

        const eventData = {
            title:"Tech fest",
            description:"talk about test fest",
            event_date:"2026-08-21",
            venue:"Auditorium",
            max_seats:100
        };

        const result = await eventService.createEvent(eventData, 7);
        expect(db.query).toHaveBeenCalledWith(
            expect.stringContaining("INSERT INTO events"),
            ["Tech fest","talk about test fest","2026-08-21","Auditorium",100, 7]
        );

        expect(result).toEqual({
            id:7,
            title:"Tech fest",
            description:"talk about test fest",
            event_date:"2026-08-21",
            venue:"Auditorium",
            max_seats:100,
            created_by:2
        })
    });

    test("getAllevents retuens all events from the query", async()=>{
        const rows = [{id: 1, title:"event a"}, {id:2, title:"event b"}];
        db.query.mockResolvedValueOnce([rows]);
        const result = await eventService.getAllEvents();

        expect(db.query).toHaveBeenCalledWith("SELECT * FROM events")
        expect(result).toEqual(rows);
    });

    test("getEventbyid returns first matching event from the query", async()=>{
        const row = [{id: 4, title:"event c"}];
        db.query.mockResolvedValueOnce([row]);
        const result = await eventService.getEventById();

        expect(db.query).toHaveBeenCalledWith("SELECT * FROM events WHERE id = ?",[4])
        expect(result).toEqual(row);
    });

     test("getEventbyid retuens undefined when no event or row matches", async()=>{
        db.query.mockResolvedValueOnce([[]]);
        const result = await eventService.getEventById(300);

        expect(result).toBeUndefined()
    });

    test("updatedEvent is called returns updated event when a row was affected", async()=>{

        db.query.mockResolvedValueOnce([{affectedRows:1}]);

        const eventData = {
            title:"updated tech fest",
            description:"updated talk about test fest",
            event_date:"2026-08-11",
            venue:"seminar hall",
            max_seats:190,
            created_by:7
        };

        const result = await eventService.updateEvent(7, eventData)

        expect(result).toEqual({id:7, ...eventData});

    });
    test("deleteEvent returns true when a row was deleetd", async()=>{

        db.query.mockResolvedValueOnce([{affectedRows:1}]);

        const result = await eventService.deleteEvent(123);

        expect(db.query).toHaveBeenCalledWith("DELETE FROM events WHERE id = ?",[123]);

        expect(result).toBe(true);
    })
})