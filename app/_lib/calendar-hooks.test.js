"use client"
import {describe, expect, it, test} from "vitest";
import {PUBLICHOSTNAME} from "@/app/_config/main";
import {fetcher} from "@/app/_lib/functions";

describe("useCycleForTheYear()", () => {
    describe("The fetcher", () => {
        // TODO: replace this
        let accessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzYxMTY3ODMxLCJpYXQiOjE3NjEwODE0MzEsImp0aSI6ImJjODIwNzVhMGJiYTRlMTJiMjU0YTk5NGZlNGZlMGU0IiwidXNlcl9pZCI6MTB9.UpnRIg-UOvviX7g0Eq9j8Bdhy75B9QWV8C0dTgw0VAc";

        test("accessToken should be defined", () => {
            expect(accessToken).toBeDefined();
        })
        test('PUBLICSHOTNAME should be defined', () => {
            expect(PUBLICHOSTNAME).toBeDefined()
        })

        it('should return the right response object', async () => {
            fetcher(`${PUBLICHOSTNAME}/menstrual/cycles`, accessToken).then(data => {
                const dateChecker = expect.stringMatching(/\d{4}-\d{2}-\d{2}/)
                expect(data[0]).toEqual({
                    "id": expect.any(Number),
                    "start_date": expect.stringMatching(/\d{4}-\d{2}-\d{2}/),
                    "bleed_end_date": dateChecker,
                    "end_date": dateChecker,
                    "safe_days": [
                        {
                            "start_date": dateChecker,
                            "end_date": dateChecker
                        },
                        {
                            "start_date": dateChecker,
                            "end_date": dateChecker
                        }
                    ],
                    "ovulation_day": dateChecker,
                    "cycle_length": expect.any(Number)
                })
            });
        });
    })
})

