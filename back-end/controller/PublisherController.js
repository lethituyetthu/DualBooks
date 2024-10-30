const publisherService = require('../service//PublisherService');

exports.createPublisher = async (publisherData) => {
    try {
        const publisher = await publisherService.createPublisher(publisherData);
        return publisher;
    } catch (error) {
        throw new Error('Error creating publisher: ' + error.message);
    }
};
