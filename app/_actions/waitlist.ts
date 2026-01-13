"use server"

import {waitListFormSchema} from "@/app/auth/lib/definitions";

import path from 'path';
import fs from 'fs/promises';
import {Log} from "@/app/_lib/utils";

// Absolute path to app/wait-list/_waitlist.json
const FILE_PATH = path.join(process.cwd(), 'app', 'wait-list', '_waitlist.json');

export async function addToWaitlist(formState, formData) {
    Log('adding to waitlist')
    Log(formData.get('firstName'))
    const validatedFields = waitListFormSchema.safeParse({
        email: formData.get('email'),
        firstName: formData.get('firstName'),
        lastName: formData.get('lastName')
    })

    // return early if there is an error
    if (!validatedFields.success) {
        return {
            success: false,
            fieldErrors: validatedFields.error.flatten().fieldErrors,
            serverError: false
        }
    }

    const entry = {
        email: formData.get('email'),
        firstName: formData.get('firstName'),
        lastName: formData.get('lastName')
    };

    try {
        let data = [];

        // Ensure folder exists
        await fs.mkdir(path.dirname(FILE_PATH), {recursive: true});

        // Try to read existing data
        try {
            const file = await fs.readFile(FILE_PATH, 'utf8');
            data = JSON.parse(file);
        } catch {
            // If file doesn't exist or is empty
        }
        const exists = data.some(user => user.email.toLowerCase() === entry.email);

        if (!exists) {
            data.push(entry);
            await fs.writeFile(FILE_PATH, JSON.stringify(data, null, 2), 'utf8');
        }
        // data.push(entry);
        //
        // await fs.writeFile(FILE_PATH, JSON.stringify(data, null, 2), 'utf8');
        return {
            success: true,
            fieldErrors: undefined,
            serverError: undefined

        }
    } catch (err) {
        Log('Error writing to _waitlist.json:', err);
        // throw new Error('Could not save entry');
        return {
            success: false,
            fieldErrors: undefined,
            serverError: true

        }
    }
}