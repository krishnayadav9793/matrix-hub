"use client"
 export const Getdata = async (items) => {
    const topic = items.item
    try {
        const res = await fetch("/api/user", {
            method: "GET",
            topicName: topic
        })
        const data = await res.json();
        return data;
    } catch (err) {
        return "SOmething went wrong";
    }
}