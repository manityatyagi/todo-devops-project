module "ec2" {
  source     = "./modules/ec2"
  aws_region = "us-east-1"
  env        = "dev"
  ami        = "ami-091138d0f0d41ff90"
  vpc_id     = module.vpc.vpc_id
  subnet_id = module.vpc.public_subnet_id
  # instance_type = "t3.micro"
  sg_cidr_block = ["0.0.0.0/0"]
}

module "vpc" {
  source   = "./modules/vpc"
  env      = module.ec2.env
  region   = module.ec2.region
  vpc_cidr = "10.0.0.0/16"
}