using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(Meter.Startup))]
namespace Meter
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
