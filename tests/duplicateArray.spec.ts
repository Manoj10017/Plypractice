import { test, expect } from "@playwright/test";

let dups=function findDuplicate(arr: number[]): number[] {
    let duplicate: number[] = [];

    for (let i = 0; i < arr.length; i++) {
        for (let j = i + 1; j < arr.length; j++) {

            if (arr[i] === arr[j] && !duplicate.includes(arr[i])) {

                duplicate.push(arr[i]);
            }

        }

    }
    console.log("all duplicates:", duplicate);
    return duplicate;

}
console.log(dups);

dups([10,20,30,10,20]);
