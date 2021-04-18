import { connect } from "../src/connect";
import { 
    resolvePaymentByConditions, 
    resolvePaymentByVouchedResult, 
} from "../src/funcs";
import {
    waitBlockNumber, 
    getConditionalPay,
    getConditions,
    getVouchedCondPayResult,
    getResolvePayByCondtionsRequest,
} from "../src/utils";
import {
    getPayInfo, 
    calculatePayId
} from "../src/query";
import { 
    blake2AsU8a 
} from '@polkadot/util-crypto';
import { u8aToHex } from "@polkadot/util";

jest.setTimeout(200000);

describe('pay resolver test', () => {
    it ('', async () => {
        const api = await connect();
        console.log("=== Resolve Payment By Conditions when the logic is BOOLEAN_AND and all conditions are true ===")
        let conditions = await getConditions(api, 3);
        let condPay = await getConditionalPay(
            api,
            conditions,
            10,
            Date.now(),
            999999,
            10, 
            0, // BooleanAnd
        );
        let truePreimgage = u8aToHex(blake2AsU8a(api.registry.createType("u64", 1).toU8a()));
        let payRequest = await getResolvePayByCondtionsRequest(
            api,
            condPay,
            [truePreimgage]
        );

        await resolvePaymentByConditions(api, 'alice', payRequest);
        await waitBlockNumber(3);

        let payId = await calculatePayId(api, condPay);
        let [payAmount, _] = await getPayInfo(api, payId);
        expect(payAmount).toBe(10);


        console.log("\n", "=== Resolve Payment By Conditions when the logic is BOOLEAN_AND and some conditions are false ====")
        conditions = await getConditions(api, 1);
        condPay = await getConditionalPay(
            api,
            conditions,
            20,
            Date.now(),
            999999,
            10,
            0, // BooleanAnd
        );
        payRequest = await getResolvePayByCondtionsRequest(
            api,
            condPay,
            [truePreimgage]
        );

        await resolvePaymentByConditions(api, 'alice', payRequest);
        await waitBlockNumber(3);

        payId = await calculatePayId(api, condPay);
        [payAmount, _] = await getPayInfo(api, payId);
        expect(payAmount).toBe(0);

        console.log("\n", "=== Resolve Payment By Conditions when the logic is BOOLEAN_OR and some conditions are true ===")
        conditions = await getConditions(api, 2);
        condPay = await getConditionalPay(
            api,
            conditions,
            30,
            Date.now(),
            999999,
            10,
            1, // BooleanOr
        );
        payRequest = await getResolvePayByCondtionsRequest(
            api,
            condPay,
            [truePreimgage]
        );

        await resolvePaymentByConditions(api, 'alice', payRequest);
        await waitBlockNumber(3);

        payId = await calculatePayId(api, condPay);
        [payAmount, _] = await getPayInfo(api, payId);
        expect(payAmount).toBe(30);

        console.log("\n", "=== Resolve Payment By Conditions when the logic is BOOLEAN_OR and all conditions are false ===")
        conditions = await getConditions(api, 0);
        condPay = await getConditionalPay(
            api,
            conditions,
            30,
            Date.now(),
            999999,
            10,
            1, // BooleanOr
        );
        payRequest = await getResolvePayByCondtionsRequest(
            api,
            condPay,
            [truePreimgage]
        );

        await resolvePaymentByConditions(api, 'alice', payRequest);
        await waitBlockNumber(3);

        payId = await calculatePayId(api, condPay);
        [payAmount, _] = await getPayInfo(api, payId);
        expect(payAmount).toBe(0);

        console.log("\n", "=============== Resolve Payment By Vouched Result ========================")
        conditions = await getConditions(api, 5);
        let sharedPay = await getConditionalPay(
            api,
            conditions,
            100,
            0,
            999999,
            10,
            3, // NumericAdd
        );
        let vouchedPayResult = await getVouchedCondPayResult(
            api,
            sharedPay,
            20
        );
        await resolvePaymentByVouchedResult(api, 'alice', vouchedPayResult);
        await waitBlockNumber(3);

        payId = await calculatePayId(api, sharedPay);
        [payAmount, _] = await getPayInfo(api, payId);
        expect(payAmount).toBe(20);

        console.log("\n", "====== Resolve Payment By Vouched Result when the new result is larger ===================")
        vouchedPayResult = await getVouchedCondPayResult(
            api,
            sharedPay,
            25
        );
        await resolvePaymentByVouchedResult(api, 'alice', vouchedPayResult);
        await waitBlockNumber(3);

        payId = await calculatePayId(api, sharedPay);
        [payAmount, _] = await getPayInfo(api, payId);
        expect(payAmount).toBe(25);

        console.log("\n", "=== Resolve Payment By Conditions when the logic is NUMERIC_ADD  =======")
        conditions = await getConditions(api, 5);
        condPay = await getConditionalPay(
            api,
            conditions,
            50,
            Date.now(),
            999999,
            10,
            3, // NumericAdd
        );
        payRequest = await getResolvePayByCondtionsRequest(
            api,
            condPay,
            [truePreimgage]
        );

        await resolvePaymentByConditions(api, 'alice', payRequest);
        await waitBlockNumber(3);

        payId = await calculatePayId(api, condPay);
        [payAmount, _] = await getPayInfo(api, payId);
        expect(payAmount).toBe(35);

        console.log("\n", "=== Resolve Payment By Conditions when the logic is NUMERIC_MAX  =======")
        conditions = await getConditions(api, 5);
        condPay = await getConditionalPay(
            api,
            conditions,
            30,
            Date.now(),
            999999,
            10,
            4, // NumericMax
        );
        payRequest = await getResolvePayByCondtionsRequest(
            api,
            condPay,
            [truePreimgage]
        );

        await resolvePaymentByConditions(api, 'alice', payRequest);
        await waitBlockNumber(3);

        payId = await calculatePayId(api, condPay);
        [payAmount, _] = await getPayInfo(api, payId);
        expect(payAmount).toBe(25);

        console.log("\n", "=== Resolve Payment By Conditions when the logic is NUMERIC_MIN  =======")
        conditions = await getConditions(api, 5);
        condPay = await getConditionalPay(
            api,
            conditions,
            30,
            Date.now(),
            999999,
            10,
            5, // NumericMin
        );
        payRequest = await getResolvePayByCondtionsRequest(
            api,
            condPay,
            [truePreimgage]
        );

        await resolvePaymentByConditions(api, 'alice', payRequest);
        await waitBlockNumber(3);

        payId = await calculatePayId(api, condPay);
        [payAmount, _] = await getPayInfo(api, payId);
        expect(payAmount).toBe(10);

        console.log("\n", "=== ResolvePayment By Condition without conditions ===")
        conditions = await getConditions(api, 6);
        condPay = await getConditionalPay(
            api,
            conditions,
            50,
            Date.now(),
            999999,
            10,
            0, // BooleanAnd
        );
        payRequest = await getResolvePayByCondtionsRequest(
            api,
            condPay,
            [truePreimgage]
        );
        await resolvePaymentByConditions(api, 'alice', payRequest);
        await waitBlockNumber(3);

        payId = await calculatePayId(api, condPay);
        [payAmount, _] = await getPayInfo(api, payId);
        expect(payAmount).toBe(50);
    });
});