import { NextResponse } from 'next/server';
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

// GET - Fetch all websites or a specific one
export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (id) {
      const website = await prisma.website.findUnique({
        where: { id: id },
      });
      
      if (!website) {
        return NextResponse.json({ error: 'Website not found' }, { status: 404 });
      }

      // Ensure user owns this website
      if (website.userId !== session.user.id) {
        return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
      }
      
      return NextResponse.json(website);
    }

    // Fetch only the current user's websites
    const websites = await prisma.website.findMany({
      where: { userId: session.user.id }
    });
    return NextResponse.json(websites);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch websites' }, { status: 500 });
  }
}

// POST - Create a new website
export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { title, items, pageSettings, nextId } = body;

    const website = await prisma.website.create({
      data: {
        title,
        items,
        pageSettings,
        nextId,
        userId: session.user.id
      },
    });

    return NextResponse.json(website, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create website' }, { status: 500 });
  }
}

// PUT - Update an existing website
export async function PUT(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { id, title, items, pageSettings, nextId } = body;

    // Check if website exists and user owns it
    const existingWebsite = await prisma.website.findUnique({
      where: { id: id }
    });

    if (!existingWebsite) {
      return NextResponse.json({ error: 'Website not found' }, { status: 404 });
    }

    if (existingWebsite.userId !== session.user.id) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const website = await prisma.website.update({
      where: { id: id },
      data: {
        title,
        items,
        pageSettings,
        nextId,
      },
    });

    return NextResponse.json(website);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update website' }, { status: 500 });
  }
}

// DELETE - Delete a website
export async function DELETE(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'ID required' }, { status: 400 });
    }

    // Check if website exists and user owns it
    const existingWebsite = await prisma.website.findUnique({
      where: { id: id }
    });

    if (!existingWebsite) {
      return NextResponse.json({ error: 'Website not found' }, { status: 404 });
    }

    if (existingWebsite.userId !== session.user.id) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    await prisma.website.delete({
      where: { id: id },
    });

    return NextResponse.json({ message: 'Website deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete website' }, { status: 500 });
  }
}