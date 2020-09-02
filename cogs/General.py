import discord
import os.path
import random
from discord.ext import commands

class General(commands.Cog):

    def __init__(self, client):
        path = os.path.dirname(__file__)
        self.client = client

    @commands.command()
    async def ping(self, msg):
        ping = round(self.client.latency * 1000)
        return await msg.send(f"**{ping}**ms")

    @commands.command()
    async def ping(self, msg):
        await msg.send(f"**{round(self.client.latency * 1000)}**ms")

def setup(client):
    client.add_cog(General(client))
