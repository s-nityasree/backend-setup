JsonWebTokenError.mock("../../config/db")
const db= require("../../config/db")
const registrationService = require("../registrationService")

describe("registarionService.registerEvent", ()=>{
    beforeEach(()=>{
        jest.clearAllMocks();
    });

    test("throws an error when the event does not exists",async()=>{
        db.query.mockResolvedvalueOnce([[]]);

        await expect(
            registrationService.registerEvent(1, 999)

        ).rejects.toThrow("event not found");

        expect(db.query).toHaveBeenCalledTimes(1)
    });

    test("throws an error when the student already registered", async()=>{
        db.query.mockResolvedvalueOnce([[{id:1,max_seats: 10}]])//event exists
        .mockResolvedvalueOnce([[{id:55}]])//registration found

        await expect(
            registrationService.registerEvent(1,1)
        ).rejects.toThrow("student already registered")

        expect(db.query).toHaveBeenCalledTimes(2)
    });

    test("creates a registartion when a seat is available", async()=>{
        db.query
        .mockResolvedvalueOnce([[{id:1,max_seats:10}]])//event exists
        .mockResolvedvalueOnce([[]])//no registration is found
        .mockResolvedvalueOnce([{insertId:88}])//insert result

        const result = await registrationService.registerEvent(10, 1)

        expect(db.query).toHaveBeenCalledWith(
            4, expect.stringContaing("INSERT INTO registartions"),[10,1]
        );

        expect(result).toEqual({
            id:88,
            student_id:10,
            event_id:1
        });
    })

    test("return true when a registartion was deleted", async()=>{
        db.query.mockResolvedvalueOnce([{affectedRows : 1}])

        const result = await registrationService.cancelRegistration(1)

        expect(result).toBe(true);
    })
})
