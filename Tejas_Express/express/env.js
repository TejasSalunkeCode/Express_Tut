// export const PORT=isNaN(process.env.PORT) ? 3000 : parseInt(process.env.PORT);

import {z, ZodError} from "zod";

// const ageSchema=z.number().min(18).max(100).int();

// const userage=17;

// const parseUserAge=ageSchema.parse(userage);
// const {data,error,success}=ageSchema.safeParse(userage);


// try {
// const parseUserAge=ageSchema.parse(userage);
// console.log(parseUserAge)
// } catch (error) {
//     if (error instanceof ZodError) {
//         console.log(error.issues[0].message);
//     }else{
//         console.log("unexpected error :",error);
//     }
// }




const portSchema=z.coerce.number().min(1).max(65000).default(3000);
export const PORT=portSchema.parse(process.env.PORT);