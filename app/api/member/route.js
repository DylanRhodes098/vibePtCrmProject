import { NextResponse } from "next/server";
import Member from "../../../models/member.js";

export const runtime = 'nodejs';

export async function GET() {
    try {
        const members = await Member.findAll();
        if (!members) {
            return NextResponse.json({ error: "cannot find members" }, { status: 400 });
        }
        return NextResponse.json(members);
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: "failed retrieving members" }, { status: 400 });
    }
}

export async function POST(req) {
    try {
        const body = await req.json();
        const { gymId, fullName, email, phone, joinDate, isActive } = body || {};

        if (!gymId || !fullName || !email) {
            return NextResponse.json({ error: "gymId, fullName and email are required" }, { status: 400 });
        }

        const created = await Member.create({
            gymId,
            fullName,
            email,
            phone: phone ?? null,
            joinDate: joinDate ? new Date(joinDate) : null,
            isActive: typeof isActive === "boolean" ? isActive : true,
        });

        return NextResponse.json(created, { status: 201 });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: "failed creating member" }, { status: 400 });
    }
}

export async function PUT(req) {
    try {
        const body = await req.json();
        const { id, ...updates } = body || {};

        if (!id) {
            return NextResponse.json({ error: "id is required" }, { status: 400 });
        }

        const member = await Member.findByPk(id);
        if (!member) {
            return NextResponse.json({ error: "member not found" }, { status: 404 });
        }

        // Normalize fields
        if (updates.joinDate !== undefined) {
            updates.joinDate = updates.joinDate ? new Date(updates.joinDate) : null;
        }

        await member.update(updates);
        return NextResponse.json(member);
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: "failed updating member" }, { status: 400 });
    }
}

export async function DELETE(req) {
    try {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id");

        if (!id) {
            return NextResponse.json({ error: "id query param is required" }, { status: 400 });
        }

        const deleted = await Member.destroy({ where: { id } });
        if (!deleted) {
            return NextResponse.json({ error: "member not found" }, { status: 404 });
        }

        return NextResponse.json({ success: true });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: "failed deleting member" }, { status: 400 });
    }
}

export const dynamic = "force-dynamic";


