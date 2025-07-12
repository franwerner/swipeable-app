import User from "@/types/UserInterface.type";
import { nanoid } from "nanoid/non-secure";


const userMock: User = {
    id: nanoid(),
    name: "John",
    lastname: "Doe"

}

export default userMock