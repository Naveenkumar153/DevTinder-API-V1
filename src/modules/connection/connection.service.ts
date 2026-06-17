import { BadRequestError, ConflictError, NotFoundError } from "@/classes/errors.js";
import { connectionRepository } from "@/modules/connection/connection.repository.js";
import { ConnectionRequest, ConnectionResponse, ConnectionResponseTypes, ConnectionResult, ConnectionValues } from "@/modules/connection/connection.types.js";
import { ConnectionStatus } from "@/shared/types/common.types.js";


export const connectionService = {
    async connectionRequest(req: ConnectionRequest): Promise<ConnectionResult> {
        const fromUser = await connectionRepository.checkUserId(req.fromUserId);
        if (!fromUser?._id) {
            throw new NotFoundError('User not found');
        }
        const checkToUserExist = await connectionRepository.checkUserId(req.toUserId);
        if (!checkToUserExist?._id) {
            throw new NotFoundError('User Not Found');
        }

        const fromUserName = `${fromUser.firstName} ${fromUser.lastName}`;
        const toUserName = `${checkToUserExist.firstName} ${checkToUserExist.lastName}`;
        const checkExistingReq = await connectionRepository.checkExistingRequest(req);
        if (checkExistingReq?._id) {
            const isReceivedRequest = checkExistingReq.fromUserId.toString() === req.toUserId
                && checkExistingReq.toUserId.toString() === req.fromUserId;
            const isPendingRequest = checkExistingReq.status === ConnectionStatus.INTERSTED;

            if (req.status === ConnectionValues.IGNORE && isReceivedRequest && isPendingRequest) {
                const connection = await connectionRepository.updateConnectionStatus(
                    checkExistingReq._id.toString(),
                    ConnectionStatus.IGNORE
                );
                if (!connection?._id) {
                    throw new NotFoundError('Connection request not found');
                }

                return {
                    message: `${fromUserName} ignored connection request from ${toUserName}`,
                    connection
                };
            }

            throw new ConflictError('Connection request already exists')
        } else {
            const connection = await connectionRepository.connectionRequest(req);
            return {
                message: `${fromUserName} sent connection request to ${toUserName}`,
                connection
            };
        }
    },

    async connectionResponse(req: ConnectionResponse) {
        const connectionExist = await connectionRepository.checkConnectionExist(req);
        if (!connectionExist?._id) {
            throw new BadRequestError('Connection request not found');
        }
        return connectionExist;
    },
};
