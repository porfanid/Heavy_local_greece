/*
 * Copyright (c) 2024. MIT License
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

const serviceAccount = require("../heavy-local-admin.json");

const admin = require("firebase-admin");
const functions = require("firebase-functions");
const axios = require("axios");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://heavy-local-12bc4-default-rtdb.firebaseio.com",
});


const bucket = admin.storage().bucket("heavy-local-12bc4.appspot.com");
const database = admin.database();
const runtimeOpts = {
    timeoutSeconds: 300,
    memory: '1GB'
};



module.exports = {
    bucket,
    database,
    runtimeOpts,
    auth: admin.auth()
};


