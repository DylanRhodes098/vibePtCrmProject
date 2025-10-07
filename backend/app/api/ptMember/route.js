import { NextResponse } from "next/server";
import PtMember from "../../../models/ptMember.js";

export const runtime = 'nodejs';

export async function GET() {
    try {
        const ptMembers = await PtMember.findAll();
        if (!ptMembers) {
            return NextResponse.json({ error: "cannot find ptMembers" }, { status: 400 });
        }
        return NextResponse.json(ptMembers);
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: "failed retrieving ptMembers" }, { status: 400 });
    }
}

export async function POST(req) {
    try {
        const body = await req.json();
        const { gymId, ptId, memberId, notes, status, lastContactedAt, nextActionAt } = body || {};

        if (!gymId || !ptId || !memberId) {
            return NextResponse.json({ error: "gymId, ptId and memberId are required" }, { status: 400 });
        }

        const created = await PtMember.create({
            gymId,
            ptId,
            memberId,
            notes: notes ?? null,
            status: status ?? "new",
            lastContactedAt: lastContactedAt ? new Date(lastContactedAt) : null,
            nextActionAt: nextActionAt ? new Date(nextActionAt) : null,
        });

        return NextResponse.json(created, { status: 201 });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: "failed creating ptMember" }, { status: 400 });
    }
}

export async function PUT(req) {
    try {
        const body = await req.json();
        const { id, ...updates } = body || {};

        if (!id) {
            return NextResponse.json({ error: "id is required" }, { status: 400 });
        }

        const ptMember = await PtMember.findByPk(id);
        if (!ptMember) {
            return NextResponse.json({ error: "ptMember not found" }, { status: 404 });
        }

        if (updates.lastContactedAt !== undefined) {
            updates.lastContactedAt = updates.lastContactedAt ? new Date(updates.lastContactedAt) : null;
        }
        if (updates.nextActionAt !== undefined) {
            updates.nextActionAt = updates.nextActionAt ? new Date(updates.nextActionAt) : null;
        }

        await ptMember.update(updates);
        return NextResponse.json(ptMember);
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: "failed updating ptMember" }, { status: 400 });
    }
}

export async function DELETE(req) {
    try {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id");

        if (!id) {
            return NextResponse.json({ error: "id query param is required" }, { status: 400 });
        }

        const deleted = await PtMember.destroy({ where: { id } });
        if (!deleted) {
            return NextResponse.json({ error: "ptMember not found" }, { status: 404 });
        }

        return NextResponse.json({ success: true });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: "failed deleting ptMember" }, { status: 400 });
    }
}

export const dynamic = "force-dynamic";


