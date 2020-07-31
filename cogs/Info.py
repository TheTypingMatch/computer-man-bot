import discord
from discord.ext import commands
from config import info

class Info(commands.Cog):

    def __init__(self, client):
        self.client = client
        self.info = info.help

    @commands.command()
    async def help(self, msg):
        helpEmbed = discord.Embed(
            title="Help", 
            description="[**GitHub**](https://github.com/TheTypingMatch/computer-man-bot/)",
            color=0x40AC7B
        )
        for cmd in self.info:
            helpEmbed.add_field(
                name=f"++{cmd}",
                value=self.info[cmd], 
                inline=False
            )
        await msg.send(embed=helpEmbed)

def setup(client):
    client.add_cog(Info(client))
