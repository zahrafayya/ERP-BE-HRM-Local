// import jwt from 'jsonwebtoken';
// import bcrypt from 'bcryptjs';
// import User from '../../infrastructure/models/user.model';
// import { UserRepository } from '../../data-access/repositories/user.repository';
//
// const secretKey = 'your_secret_key'; // Move this to environment variables
//
// export async function registerUser(name: string, email: string, password: string) {
//     try {
//         const hashedPassword = await bcrypt.hash(password, 10);
//
//         // Basic name splitting, needs refinement for edge cases
//         let [firstName, lastName] = name.split(' ');
//         lastName = lastName || ''; // Fallback if no lastName is provided
//
//         const userRepository = new UserRepository();
//         const user = await userRepository.createUser({
//             email,
//             password: hashedPassword,
//             firstName,
//             lastName,
//
//         });
//
//         return user;
//     } catch (error) {
//         console.error(error);
//         throw new Error('RegistrationError');
//     }
// }
//
// export async function authenticateUser(email: string, password: string) {
//     const userRepository = new UserRepository();
//     const user = await userRepository.findByEmail(email);
//     if (!user) return null;
//
//     const isPasswordValid = await bcrypt.compare(password, user.password);
//     if (!isPasswordValid) return null;
//
//     const token = jwt.sign({ id: user.pkid, email: user.email }, secretKey, { expiresIn: '1h' });
//     return token;
// }
// //
// // // Placeholder for SSO authentication
// // export async function authenticateWithSSO(ssoToken: string) {
// //     // Here, you would integrate with an actual SSO service
// //     // For demonstration, we're just decoding a JWT token
// //     try {
// //         const decoded = jwt.verify(ssoToken, secretKey);
// //         const userRepository = new UserRepository();
// //         const user = await userRepository.findByEmail(decoded.email);
// //         if (!user) {
// //             // If the user doesn't exist, create a new one
// //             return await userRepository.createUser({
// //                 email: decoded.email,
// //                 username: decoded.name,
// //                 // Other user details...
// //             });
// //         }
// //         return user;
// //     } catch (error) {
// //         return null; // or handle error appropriately
// //     }
// // }
