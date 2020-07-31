import discord
import os.path
import random
from discord.ext import commands

class General(commands.Cog):

    def __init__(self, client):
        path = os.path.dirname(__file__)
        self.client = client

    @commands.command()
    async def invite(self, msg):
        embed = discord.Embed(
            title="Invite",
            description="Invite the bot [**here**](https://canary.discord.com/api/oauth2/authorize?client_id=735326937643352065&permissions=8&scope=bot).",
            color=0xf52597
        )
        await msg.send(embed=embed)

def setup(client):
    client.add_cog(General(client))
