import mongoose from "mongoose";

export const withTransaction = async (method: mongoose.mongo.WithTransactionCallback<any>) => {
    const session = await mongoose.startSession();
    let isCommitted = false;

    try {
        session.startTransaction();

        const result: any = method(session);
        await session.commitTransaction();

        isCommitted = true;
        session.endSession();

        return result;
    } catch (e) {
        if (!isCommitted) await session.abortTransaction();

        session.endSession();

        throw e;
    }
};
