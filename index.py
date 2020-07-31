import os
import os.path
import discord

from discord.ext import commands
from dotenv import load_dotenv

load_dotenv()

client = commands.Bot(command_prefix="!")
client.remove_command("help")

@client.event
async def on_ready():
    print("I am the computer man and I am ready for questions. Thank you.")
    await client.change_presence(
        activity=discord.Activity(
            type=discord.ActivityType.watching, 
            name="printer.discord.com"
        )
    )

for filename in os.listdir("./cogs"):
    if filename.endswith(".py"):
        client.load_extension(f"cogs.{filename[:-3]}")

client.run(os.getenv("TOKEN"))
