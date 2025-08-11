
const admin = require('firebase-admin');
admin.initializeApp();

exports.sendMessage = async (req, res) => {
    if (req.method !== 'POST') {
        return res.status(405).send('Method Not Allowed');
    }
    const { user, message } = req.body;
    if (!user || !message) {
        return res.status(400).send('Missing user or message');
    }
    await admin.firestore().collection('messages').add({
        user,
        message,
        timestamp: admin.firestore.FieldValue.serverTimestamp()
    });
    res.status(200).send({status: 'Message sent'});
};
