jest.mock("../../config/db")

const db = require("../config/db")
const reportService = require("../reportService")

describe("reportService" , ()=>{

    beforeEach(()=>{
        jest.clearAllMocks();
    });

    test("getEventsummary returns the aggregate rows", async()=>{
        const rows = [
            {id:1, title:"event a", total_registrations:3},
            {id:2, title:"event b", total_registrations:0}
        ]
        db.query.mockResolvedValueOnce([rows])

        const result = await reportService.getEventSummary();

        expect(db.query).toHaveBeenCalledWith(expect.stringContaining("LEFT JOIN registartions"))
        expect(result).toequal(rows);
    })

    test("getstudentbyevent queries with the given event id and return rows", async()=>{
        const rows = [{id:1, name:"John", email:"john@test.com"}]

        db.query.mockResolvedValueOnce([rows]);

        const result = await reportService.getStudentByEvent(5);

        expect(db.query).toHaveBeenCalledWith(expect.stringContaining("WHERE r.event_id=?"),[5]);

        expect(result).toEqual(rows);
    });

    test("getStudentsSummary returns the joined summary rows", async()=>{
        const rows = [{id:1,name:"John",title:"event a"}];
        db.query.mockResolvedValueOnce([rows])

        const result = await reportService.getEventSummary();

        expect(result).toEqual(rows)
    }
        
    )
})