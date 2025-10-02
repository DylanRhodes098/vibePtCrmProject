import { NextResponse } from "next/server";
import Gym from "../../../models/gym.js";

export const runtime = 'nodejs';

export async function GET() {
    try {
        const gyms = await Gym.findAll();
        if (!gyms) {
            return NextResponse.json({ error: "cannot find gyms" }, { status: 400 });
        }
        return NextResponse.json(gyms);
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: "failed retrieving gyms" }, { status: 400 });
    }
}

export async function POST(req) {
    try {
        const body = await req.json();
        const { name, brand_theme_json } = body || {};

        if (!name) {
            return NextResponse.json({ error: "name is required" }, { status: 400 });
        }

        const created = await Gym.create({
            name,
            brand_theme_json: brand_theme_json ?? null,
        });

        return NextResponse.json(created, { status: 201 });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: "failed creating gym" }, { status: 400 });
    }
}

export async function PUT(req) {
    try {
        const body = await req.json();
        const { id, ...updates } = body || {};

        if (!id) {
            return NextResponse.json({ error: "id is required" }, { status: 400 });
        }

        const gym = await Gym.findByPk(id);
        if (!gym) {
            return NextResponse.json({ error: "gym not found" }, { status: 404 });
        }

        await gym.update(updates);
        return NextResponse.json(gym);
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: "failed updating gym" }, { status: 400 });
    }
}

export async function DELETE(req) {
    try {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id");

        if (!id) {
            return NextResponse.json({ error: "id query param is required" }, { status: 400 });
        }

        const deleted = await Gym.destroy({ where: { id } });
        if (!deleted) {
            return NextResponse.json({ error: "gym not found" }, { status: 404 });
        }

        return NextResponse.json({ success: true });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: "failed deleting gym" }, { status: 400 });
    }
}

export const dynamic = "force-dynamic";


