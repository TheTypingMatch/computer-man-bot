import discord
from discord.ext import commands
from config import info

class Info(commands.Cog):

    def __init__(self, client):
        self.client = client
        self.info = info.help

    @commands.command()
    async def help(self, msg):
        description = "[**GitHub**](https://github.com/TheTypingMatch/computer-man-bot/)\n"

        for cmd in self.info:
            description += f"\n`++{cmd}` - {self.info[cmd]}"

        helpEmbed = discord.Embed(
            title="Help", 
            description=description,
            color=0xf52597
        )

        await msg.send(embed=helpEmbed)

def setup(client):
    client.add_cog(Info(client))
