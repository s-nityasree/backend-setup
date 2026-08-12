jest.mock("../../config/db")

const db= require("../../config/db")
const userService = require("../userService")

describe("userService", ()=>{
    beforeeach(()=>{
        jest.clearAllMocks();
    })

    test("getallusers return all rows", async()=>{
        const rows = [{id:1, name:"John"}, {id:2, name:"Sam"}];
        db.query.mockResolvedvalueOnce([rows]);

        const result = await userService.getAllUsers()

        expect(db.query).toHaveBeenCalledWith("SELECT * FROM users");
        expect(result).toEqual(rows)
    })

    test("createuser inserts a user and returns it with a new id", async()=>{
        db.query.mockResolvedvalueOnce([{insertId: 10}]);

        const result = await userService.createUser({
            name:"John",
            email:"john@test.com",
            password:"hashed",
            role:"student"
        })
        expect(db.query).toHaveBeenCalledWith(expect.stringContaining("INSERT INTO users"),
    ["John","john@test.com","hashed","student"]);

    expect(result).toEqual({
        id:10,
        name:"John",
        email:"john@test.com",
        role:"student"
    })

    })

    test("getUserById returns the matching row without the password", async()=>{
        const row = {id:3, name:"John", email:"john@test.com", role:"student"};
        db.query.mockResolvedvalueOnce([[row]]);

        const result = await userService.getUserById(3);

        expect(db.query).toHaveBeenCalledWith(
            expect.stringContaining("SELECT id,name,email,role"),[3]
        );
        expect(result).toEqual(row)
    })

    test("getUserbyid returns undefined when there is no matching id found", async()=>{
        db.query.mockResolvedvalueOnce([[]]);

        const result= await userService.getUserById(9999);

        expect(result).toBeUndefined();
    })

    test("updatedUser returns null when no rows were affected", async()=>{
        db.query.mockResolvedvalueOnce([{affectedRows:0}]);

        const result = await userService.updateUser(1,{name:"x", email:"y", password:"z", role:"student"})

        expect(result).toBeNull();
    })

    test("updateUser returns the updated user when a row was affected",async()=>{
         db.query.mockResolvedValueOnce([{affectedRows:1}]);

         const result = await userService.updateUser(4, {
            name:"John updated",
            email:"john1@test.com",
            password:"newhashed",
            role:"faculty"
         })
         expect(result).toEqual({
            id:4,
            name:"John updated",
            email:"john1@test.com",
            password:"newhashed",
            role:"faculty"
         })
    });
})