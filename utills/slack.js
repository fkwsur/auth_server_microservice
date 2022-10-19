const dotenv = require('dotenv');
dotenv.config();
const { IncomingWebhook } = require("@slack/webhook");
const { SLACK_ERROR_HOOK_URL } =
    process.env;
const errorWebhook = new IncomingWebhook(SLACK_ERROR_HOOK_URL);

module.exports = {
    SendErrorChannel: async (errorObject) => {
        try {
            const errorText =
                "발생한 위치 : " +
                errorObject.location +
                "\n" +
                "발생한 에러 : " +
                errorObject.error;
            await errorWebhook.send({
                text: errorText,
            });
        } catch (error) {}
    },
};
