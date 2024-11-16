"use server"

/**
 * Send daily feeling
 * @param feeling
 * @returns {Promise<void>}
 */
export async function sendCurrentFeeling(feeling) {
    // Call route that sends feeling
    return {
        success: true
    }
}

/**
 * Bookmark a post for the user
 * @param postId
 * @returns {Promise<{success: boolean}>}
 */
export async function bookmarkPost(postId) {
    // TODO: Make this actually work
    return {
        marked: true
    }
}

export async function unbookmarkPost(postId) {
    return {
        marked: false
    }
}

export async function moodsAndFeelingsForTheDay(state) {
    // send to server
}